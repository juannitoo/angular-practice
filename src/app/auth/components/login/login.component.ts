import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { NodeUser } from 'src/app/core/interfaces/node-user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { NodeService } from 'src/app/core/services/node.service';
import { emailValidator } from 'src/app/shared/validators/email.validator';
import { isEmailUsedValidator } from 'src/app/shared/validators/is-email-used.validator';
import { confirmEqualValidator } from 'src/app/shared/validators/passwords.validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {    // , DoCheck

  buttonValue! : string
  signUpForm! : FormGroup
  password!: FormControl
  confirmPassword!: FormControl
  passwordForm!: FormGroup
  showPasswordsError$!: Observable<boolean>
  errorMessageIdentifiant!: boolean
  errorMessageEmailExistant!: boolean
  validForm$!: Observable<boolean>
  hideConnectionPassword!: boolean
  hidePassword!: boolean
  hidePassword2!: boolean

  loginSubscrition!: Subscription
  signUpSubscrition!: Subscription

  isLogged$! : Observable<boolean>
  user$!: Observable<NodeUser> | null


  constructor( private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private nodeService: NodeService
            ) {}

  ngOnInit(): void {
    
    this.signUpForm = this.formBuilder.group({
      email: [ null, 
              [ Validators.required, emailValidator() ], 
              // [ isEmailUsedValidator(this.authService)], // je ne le veux pas pour la connexion
      ],
      connectionPassword: [null, [Validators.required, Validators.minLength(5)]],
    }, {
      updateOn: 'change' // je comprends et j'ai vu le pbme du change mais le checkIfEmailIsUsed demarre qd length > 5    
    })  // De plus c'est une démo sur aws, ca devrait tenir pr mes 3 utilisateurs ! voir checkIfEmailIsUsed ds authServcie pour la limite

    this.buttonValue = "Se connecter"

    this.hideConnectionPassword = true
    this.hidePassword = true
    this.hidePassword2 = true
    this.errorMessageIdentifiant= false
    this.isLogged$ = this.authService.isLogged$
    this.user$ = this.nodeService.getUser()
  }
  
  // ngDoCheck(){
  //   this.testFormValidity()
  // }

  ngOnDestroy(): void{
    if (this.loginSubscrition) this.loginSubscrition.unsubscribe()
    if (this.signUpSubscrition) this.signUpSubscrition.unsubscribe()
  }


  onSubmitForm(){
    const data : Data = { email : this.signUpForm.value.email }

    if (this.buttonValue === "Se connecter"){

      data['password'] = this.signUpForm.value.connectionPassword
      this.loginSubscrition = this.authService.login(data).subscribe({
        next : () => { this.router.navigateByUrl('nodeJs') },
        error : (err) => { this.errorMessageIdentifiant = true; console.log(err) }
      })

    } else { 

      data['password'] = this.signUpForm.value.password['password']
      this.signUpSubscrition =  this.authService.signUp(data).subscribe({
        next : () => { this.router.navigateByUrl('nodeJs') },
        error : () => { this.errorMessageEmailExistant = true }
      })

    }
  }

  onChooseForm(formType: string){
    this.buttonValue = "Se connecter"
    this.errorMessageIdentifiant = false
    this.errorMessageEmailExistant = false

    const isEmailUsedAsyncValidator = isEmailUsedValidator(this.authService)

    if (formType === "inscription"){
      this.buttonValue = "S'inscrire"
      this.signUpForm.removeControl("connectionPassword")
      this.password = this.formBuilder.control(null, [Validators.required, Validators.minLength(5)] )
      this.confirmPassword = this.formBuilder.control(null, Validators.required )
      this.passwordForm = this.formBuilder.group({
        password : this.password,
        password2: this.confirmPassword
        }, { validators: [ confirmEqualValidator('password', 'password2') ]
      })
      this.signUpForm = this.formBuilder.group({
        ...this.signUpForm.controls,
        password: this.passwordForm
      })
      this.showPasswordsError$ = this.passwordForm.statusChanges.pipe(
        map(status => status === 'INVALID' && this.password.value && this.confirmPassword.value ),
      )
      this.signUpForm.controls['email'].addAsyncValidators(isEmailUsedAsyncValidator)
      this.signUpForm.controls['email'].updateValueAndValidity()

    } else {
      if (this.signUpForm.controls['password']) this.signUpForm.removeControl("password")
      if (this.signUpForm.controls['confirmPassword']) this.signUpForm.removeControl("confirmPassword")
      if (!this.signUpForm.controls['connectionPassword']) {
        this.signUpForm.addControl("connectionPassword", this.formBuilder.control('', [Validators.required, Validators.minLength(5)]))
      }
      this.signUpForm.controls['email'].clearAsyncValidators()
      this.signUpForm.controls['email'].removeAsyncValidators(isEmailUsedAsyncValidator)
      this.signUpForm.controls['email'].updateValueAndValidity()
      this.errorMessageIdentifiant = false
      this.errorMessageEmailExistant = false
    }

  }

  // testFormValidity(){
  //   console.log("signup email: ", this.signUpForm.get('email')?.status)
  //   console.log("paswword :", this.passwordForm.status)
  //   console.log('---', this.confirmPassword.value) // génère erreur, obs pas init
  // }


}

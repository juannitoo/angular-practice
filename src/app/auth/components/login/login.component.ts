import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { isEmailUsedValidator } from 'src/app/shared/validators/is-email-used.validator';
import { confirmEqualValidator } from 'src/app/shared/validators/passwords.validator';

// https://arjunphp.com/angular-2-async-validator-usernameemail-availability-check/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {    // DoCheck

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


  constructor( private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
            ) {}

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      email: [ null, 
              [ Validators.required, Validators.email ], 
              // [ isEmailUsedValidator.createValidator(this.authService)]
      ],
      connectionPassword: [null, [Validators.required, Validators.minLength(5)]],
    }, {
      updateOn: 'change'
    })

    this.buttonValue = "Se connecter"

    this.hideConnectionPassword = true
    this.hidePassword = true
    this.hidePassword2 = true
    this.errorMessageIdentifiant= false

  }

  // ngDoCheck(){
  //   this.testFormValidity()
  // }


  onSubmitForm(){
    const data : Data = { email : this.signUpForm.value.email }

    if (this.buttonValue === "Se connecter"){

      data['password'] = this.signUpForm.value.connectionPassword
      this.authService.login(data).subscribe({
        next : () => { this.router.navigateByUrl('nodeJs') },
        error : (err) => { this.errorMessageIdentifiant = true; console.log(err) }
      })

    } else { 

      data['password'] = this.signUpForm.value.password['password']
      this.authService.signUp(data).subscribe({
        next : () => { this.router.navigateByUrl('nodeJs') },
        error : () => { this.errorMessageEmailExistant = true }
      })

    }
  }

  onChooseForm(formType: string){
    this.buttonValue = "Se connecter"
    this.errorMessageIdentifiant = false
    this.errorMessageEmailExistant = false

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

    } else {
      if (this.signUpForm.controls['password']) this.signUpForm.removeControl("password")
      if (this.signUpForm.controls['confirmPassword']) this.signUpForm.removeControl("confirmPassword")
      if (!this.signUpForm.controls['connectionPassword']) {
        this.signUpForm.addControl("connectionPassword", this.formBuilder.control('', [Validators.required, Validators.minLength(5)]))
      }
      this.errorMessageIdentifiant = false
      this.errorMessageEmailExistant = false
    }

  }

  testFormValidity(){
    console.log("signup: ", this.signUpForm.status)
    console.log("paswword :", this.passwordForm.status)
    console.log('---', this.confirmPassword.value) // génère erreur, obs pas init
  }


}

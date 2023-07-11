import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { NodeService } from 'src/app/core/services/node.service';
import { confirmEqualValidator } from 'src/app/shared/validators/passwords.validators';

// https://arjunphp.com/angular-2-async-validator-usernameemail-availability-check/

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {    // DoCheck

  buttonValue! : string
  signUpForm! : FormGroup
  password!: FormControl
  confirmPassword!: FormControl
  passwordForm!: FormGroup
  showPasswordsError$!: Observable<boolean>
  validForm$!: Observable<boolean>
  hideConnectionPassword!: boolean
  hidePassword!: boolean
  hidePassword2!: boolean

  constructor( private formBuilder: FormBuilder,
              private nodeService: NodeService,
              private router: Router) {}

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      connectionPassword: [null, [Validators.required, Validators.minLength(5)]],
    }, {
      updateOn: 'change'
    })

    this.buttonValue = "Se connecter"

    this.hideConnectionPassword = true
    this.hidePassword = true
    this.hidePassword2 = true

  }

  // ngDoCheck(){
  //   this.testFormValidity()
  // }

  onSubmitForm(){

    const data : Data = { email : this.signUpForm.value.email }

    if (this.buttonValue === "Se connecter"){
      
      console.log("connexion component")
      data['password'] = this.signUpForm.value.connectionPassword
      this.nodeService.loginUser(data).pipe(
        tap((param) => console.log('param:', param)),
        tap( ()=> this.router.navigateByUrl(''))
      ).subscribe()

    } else {

      console.log("inscription component")
      data['password'] = this.signUpForm.value.password
      this.nodeService.signUpUser(data)

    }
  }

  chooseForm(formType: string){
    this.buttonValue = "Se connecter"
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
      if ( this.signUpForm.controls['password']) this.signUpForm.removeControl("password")
      if ( this.signUpForm.controls['confirmPassword']) this.signUpForm.removeControl("confirmPassword")
      if ( !this.signUpForm.controls['connectionPassword']) {
        this.signUpForm.addControl("connectionPassword", this.formBuilder.control('', [Validators.required, Validators.minLength(5)]))
      }
    }

  }

  testFormValidity(){
    console.log("signup: ", this.signUpForm.status)
    console.log("paswword :", this.passwordForm.status)
    console.log('---', this.confirmPassword.value) // génère erreur, obs pas init
  }


}

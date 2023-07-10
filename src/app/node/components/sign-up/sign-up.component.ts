import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { NodeService } from 'src/app/core/services/node.service';
import { confirmEqualValidator } from 'src/app/shared/validators/passwords.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck{

  buttonValue! : string
  signUpForm! : FormGroup
  password!: FormControl
  confirmPassword!: FormControl
  passwordForm!: FormGroup

  constructor( private formBuilder: FormBuilder,
              private nodeService: NodeService,
              ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      connectionPassword: [null, [Validators.required, Validators.minLength(5)]],
    }, {
      updateOn: 'change'
    })
    this.buttonValue = "Se connecter"
  }

  ngDoCheck(){
    // this.testFormValidity()
  }

  onSubmitForm(){
    const data : Data = { 
      email : this.signUpForm.value.email,
      password : this.signUpForm.value.password
    }
    if (this.buttonValue === "Se connecter"){
      console.log("connexion component")
      this.nodeService.signInUser(data)
    } else {
      console.log("inscription component")
      this.nodeService.signInUser(data)
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
    } else {
      this.signUpForm.addControl("connectionPassword", this.formBuilder.control('', [Validators.required, Validators.minLength(5)]))
    }
  }

  testFormValidity(){
    console.log("signup: ", this.signUpForm.status)
    // console.log("paswword :", this.passwordForm.status)
  }


}

import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, } from 'rxjs';
import { UserUpdateForm } from 'src/app/core/interfaces/user-update-form.interface';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';
import { emailValidator } from '../../validators/email.validators';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  animations: [
    trigger( 'slideText', [
      transition('void => *', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '500ms',
          }
      })
    ])
  ])],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  userForm! : FormGroup

  user$! : Observable<User>
  userId!: Number

  data$! : Subscription

  constructor( private formBuilder: FormBuilder,
                private usersService: UsersService,
                private route: ActivatedRoute ) { }


  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id']
    this.user$ = this.usersService.getUser(this.userId)
    this.userForm = this.formBuilder.group({
      name : [null, [Validators.required, Validators.minLength(5)]],
      username : [null, [Validators.required, Validators.maxLength(50)]],
      email : [null, [ emailValidator() ]], // c'est pour la démo
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    }, {
      updateOn: 'blur'
    })
    // je récupère le référence de this pour pouvoir cibler 
    // les éléments de la classe dans le subscribe
    let self = this
    this.data$ = this.user$.subscribe({
      next(user) {
        self.userForm.setValue({
          name : user.name !== undefined ? user.name : "",
          username : user.username !== undefined ? user.username : "",
          email : user.email !== undefined ? user.email : "",
          addressCity : user.address?.city !== undefined ? user.address?.city : "",
          phone : user.phone !== undefined ? user.phone : "",
          website : user.website !== undefined ? user.website : "",
          companyName : user.company?.name !== undefined ? user.company?.name : ""
        })  
      },
      error(err) {
        console.log("erreur user-update datas.subscribe() :", err)
      }
    })
    
  }

  onSubmitForm(): void {
    const userFormValues = this.userForm.value
    const userValues: UserUpdateForm = {
      address : { 
        city : userFormValues.addressCity,
      },
      company : {
        name : userFormValues.companyName,
      },
      email: userFormValues.email,
      name: userFormValues.name,
      phone: userFormValues.phone,
      username: userFormValues.username,
      website: userFormValues.website
    }
    this.usersService.updateUser(this.userId, userValues)
  }

  errorText(ctrl: AbstractControl){
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (ctrl.hasError('emailValidatorError')) {
        // emailValidatorError est le nom de la var renseignée dans le validator
        return "Cet email n'a pas la forme minimale requise : x@x.xx";
    } else {
        return 'Ce champ contient une erreur';
    }
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe()
    this.userForm.controls['name'].clearValidators()
    this.userForm.controls['username'].clearValidators()
    this.userForm.controls['email'].clearValidators()
    this.userForm.controls['name'].updateValueAndValidity()
    this.userForm.controls['username'].updateValueAndValidity()
    this.userForm.controls['email'].updateValueAndValidity()
  }
    
}
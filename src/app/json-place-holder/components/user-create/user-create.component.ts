import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  animations: [
    trigger( 'slideText', [
      transition('void => *', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '400ms',
              direction: 'X',
                  directionValue: '-100%'
          }
        })
      ])
    ]),
    trigger('slideInput', [
      transition(':enter', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '550ms',
              direction: 'X',
                  directionValue: '-100%'
          }
        })
      ])
    ]),
    trigger('slideInput2', [
      transition(':enter', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              direction: 'X',
                  directionValue: '-100%'
          }
        })
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateComponent implements OnInit {

  userCreateForm!: FormGroup

  // j'affiche les 2 premiers chps lors du post du formulaire
  newUser! : User

  constructor( private formBuider: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userCreateForm = this.formBuider.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      username: [null, [Validators.required, Validators.maxLength(50)]],
    }, {
      updateOn: 'blur'
    })
 
  }

  backToList(){
    return this.router.navigateByUrl('jsonplaceholder/users');
  }

  onSubmitForm() {
    this.usersService.addUser(this.userCreateForm.value)
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { catchError, map, retry, take, takeUntil, tap } from 'rxjs/operators';
import { UserCreateValues } from 'src/app/core/interfaces/js-user-create-form.interface';
import { JsUsersService } from 'src/app/core/services/js-users.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userForm! : FormGroup
  userId! : number

  componentDestroyed$: Subject<void> = new Subject<void>()

  constructor( private formBuilder: FormBuilder,
                private jsUsersService: JsUsersService,
                private router: Router,
                private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id']
    this.userForm = this.formBuilder.group({
      name : [null],
      username : [null],
      email : [null],
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    });
    this.jsUsersService.getUser(this.userId).pipe(
      map(
        (user)=>{
          this.userForm.controls['name'].setValue(user.name)
          this.userForm.controls['username'].setValue(user.username)
          this.userForm.controls['email'].setValue(user.email)
          this.userForm.controls['addressCity'].setValue(user.address?.city)
          this.userForm.controls['phone'].setValue(user.phone)
          this.userForm.controls['website'].setValue(user.website)
          this.userForm.controls['companyName'].setValue(user.company?.name)
        }
      )
    ).subscribe({
      error: (error) => console.error(`erreur dans ngOnInit getUser() jsonserver/users/update : ${error}`)
    })
    
  }

  onSubmitForm(userId: number): void {
    const userFormValues = this.userForm.value
    const userValues: UserCreateValues = {
      address : { 
        city : userFormValues.addressCity,
        geo: {lat:"",lng:""},
        street:"",
        suite:"",
        zipcode:""
      },
      company : {
        name : userFormValues.companyName,
        catchPhrase:"",
        bs:""
      },
      email: userFormValues.email,
      name: userFormValues.name,
      phone: userFormValues.phone,
      username: userFormValues.username,
      website: userFormValues.website
    }
    this.jsUsersService.updateUser( userId, userValues).pipe(
      tap(() => this.router.navigateByUrl('json-server/users')),
      takeUntil(this.componentDestroyed$),
      catchError((err: HttpErrorResponse) => { 
        throw `erreur dans onSubmitForm() jsonserver/users/update : ${err.message}` 
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next()
    this.componentDestroyed$.complete()
  }

}

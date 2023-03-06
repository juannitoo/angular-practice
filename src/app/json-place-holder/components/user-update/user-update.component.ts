import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  userForm! : FormGroup

  // private userCreateFormObs!: Subscription
  private userCreateFormObs! : any

  user$! : Observable<User | undefined>
  userId!: Number

  constructor( private formBuilder: FormBuilder,
                private usersService: UsersService,
                private router: Router,
                private route: ActivatedRoute ) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name : [null],
      username : [null],
      email : [null],
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    })
    this.userId = +this.route.snapshot.params['id']
    this.user$ = this.usersService.getUser(this.userId)
  }

  
  onSubmitForm(): any {
    // comme j'ai pas mis les champs de form qui correspondent 
    // au modèle des users complets, je triche ... pour l'instant ...
    const userFormValues = this.userForm.value
    const userValues: any = {
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
    this.userCreateFormObs = this.usersService.updateUser(this.userId,userValues)
    // .pipe(
    //   tap(() => this.router.navigateByUrl('json-place-holder/users'))
    // ).subscribe({
    //   error: (error:any) => console.error(`erreur dans onSubmitForm() json-place-holder/users/update : ${error}`)
    // })
  }

  ngOnDestroy(): void {
    // this.userCreateFormObs.unsubscribe()
  }
    
}
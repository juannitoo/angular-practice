import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserCreateValues } from 'src/app/core/interfaces/js-user-create-form.interface';
import { User } from 'src/app/core/models/user.model';
import { JsUsersService } from 'src/app/core/services/js-users.services';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  userForm! : FormGroup

  private userCreateFormObs!: Subscription

  constructor( private formBuilder: FormBuilder,
                private jsUsersService: JsUsersService,
                private router: Router ) { }


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
  }

  
  onSubmitForm(): any {
    // comme je n'ai pas mis les champs de form qui correspondent 
    // au modèle des users complets, je triche ...
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
    this.userCreateFormObs = this.jsUsersService.addUser(userValues).pipe(
      tap(() => this.router.navigateByUrl('json-server/users'))
    ).subscribe({
      error: (error) => console.error(`erreur dans onSubmitForm() json-server/users/create : ${error}`)
    })
  }

  backToList(): void{
    this.router.navigate(['json-server','users'])
  }

  ngOnDestroy(): void {
    // this.userCreateFormObs.unsubscribe()
    // le lien de retour ne fonctionne dans aucun cas sinon, WTF ?
  }
    
}
  



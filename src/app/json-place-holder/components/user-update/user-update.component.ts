import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
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
      name : [null],
      username : [null],
      email : [null],
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    })
    // je récupère le référence de this pour pouvoir cibler 
    // les éléments de la classe dans le subscribe
    let self = this
    this.data$ = this.user$.subscribe({
      next(user) {
        self.userForm.setValue({
          name : user.name,
          username : user.username,
          email : user.email,
          addressCity : user.address?.city,
          phone : user.phone,
          website : user.website,
          companyName : user.company?.name
        })  
      },
      error(err) {
        console.log("erreur user-update datas.subscribe() :", err)
      }
    })
    
  }

  onSubmitForm(): void {
    // comme je n'ai pas mis les champs de form qui correspondent 
    // au modèle des users complets, je triche ...
    const userFormValues = this.userForm.value
    const userValues: Object = {
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
    this.usersService.updateUser(this.userId, userValues)
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe()
  }
    
}
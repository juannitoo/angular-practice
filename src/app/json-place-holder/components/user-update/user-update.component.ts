import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';


// petite déception dans la gestion des forms
// https://angular.io/guide/deprecations#ngmodel-with-reactive-forms
// Il ne faut pas mélanger les template form et reactive form, logique ...
// donc je ne peux grosso modo pas récupérer proprement les datas du behaviorSubject 
// pour les assigner directement dans la classe pour pré-remplir les champs du form lors d'un update...
// Donc, hack :

// const dataPlaceholder = {}

// Cette const serait pour enregistrer les datas du behavior subject asObservable()
// vu que si je la place ds la classe, le futur this de this.dataPlaceholder écrit dans le subscribe 
// lui même écrit dans la classe ne correspond plus à la classe, mais à celui du subscribe, logique mais hic ...

// Ca ne me plait pas, je commente ce hack et reste avec mon warning ds la console en attendant de trouver mieux
// Créer un autre fichier, je trouve ca nul aussi ... une fonction de conversion obsToArray peut-être ... 
// faut voir comment font les autres ...

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  userForm! : FormGroup

  private userCreateForm! : any

  user$! : Observable<User>
  userId!: Number

  dataPlaceholder!: {name: String, username: String, email: String, addressCity: String, phone: String, website: String, companyName: String}

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

    // console.log('!!!O_O!!', this.test(this.dataPlaceholder))
    // this.userForm.setValue({
    //   name : dataPlaceholder.name,
    //   username : "jean",
    //   email : "jean",
    //   addressCity : "jean",
    //   phone : "jean",
    //   website : "jean",
    //   companyName : "jean"
    // })  
  }

  // test(x:any){
  //   // let self = this
  //   this.user$.subscribe({
  //     next(value:any){
  //       // self.dataPlaceholder['name'] = value.name
  //       // this de la propiété de la classe n'est pas là
  //       x.name = value.name;
  //       return x
  //     }
  //   })
  //   return x
  // }

  onSubmitForm() {
    // comme je n'ai pas mis les champs de form qui correspondent 
    // au modèle des users complets, je triche ... pour l'instant ...
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
    // this.userCreateFormObs$.unsubscribe()
  }
    
}
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm!: FormGroup;

  // j'affiche les 2 premiers chps lors du post du formulaire
  newUser! : User

  constructor( private formBuider: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userCreateForm = this.formBuider.group({
      name: [null],
      username: [null],
      // email: [null],
      // city: [null],
      // phone: [null],
      // website: [null],
      // company: [null],
    })
 
  }
  
  ngDoCheck(): void {
    // si un newUser post a été fait sur la page
    if (this.route.snapshot.queryParams['id']){
      console.log('retour observable dom')
      this.newUser = {
        id: this.route.snapshot.queryParams['id'],
        name: this.route.snapshot.queryParams['name'],
        username: this.route.snapshot.queryParams['username'],
        // email: this.route.snapshot.queryParams['email'],
        // address: this.route.snapshot.queryParams['address'],
        // phone: this.route.snapshot.queryParams['phone'],
        // website: this.route.snapshot.queryParams['website'],
        // company: this.route.snapshot.queryParams['company'],
      }
    }  
  }

  onSubmitForm() {
    this.usersService.addUser(this.userCreateForm.value).subscribe(
      (data) => { 
        console.log("le user en retour", data);
        // je construit un faux user qui n'est pas sauvegardé
        // avec les datas passés dans l'url
        // pour avoir au moins un faux comportement.
        // en attendant de trouver mieux...
        const idUser = 11
        const user = {...data, id : idUser}
        this.router.navigate(['jsonplaceholder','users','create'], {
          queryParams: user,
        })
      }      
    )
  }

}

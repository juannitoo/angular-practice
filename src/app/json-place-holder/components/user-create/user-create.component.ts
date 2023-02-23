import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
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
    })
 
  }
  
  // commenté suite nouveau comportement sur CRUD create et delete
  // ngDoCheck(): void {
  //   // si un newUser post a été fait sur la page
  //   if (this.route.snapshot.queryParams['id']){
  //     this.newUser = {
  //       id: this.route.snapshot.queryParams['id'],
  //       name: this.route.snapshot.queryParams['name'],
  //       username: this.route.snapshot.queryParams['username'],
  //     }
  //   }  
  // }

  onSubmitForm() {
    this.usersService.addUser(this.userCreateForm.value).pipe(
      map( () => this.router.navigateByUrl('jsonplaceholder/users'))
    ).subscribe();
  }

}

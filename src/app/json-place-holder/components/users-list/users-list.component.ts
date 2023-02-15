import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit { 

  users! : Observable<User[]>

  constructor( private usersServ : UsersService) { }

  ngOnInit(): void {
    this.users = this.usersServ.getUsers()
  }

  onAddUser(){
    this.usersServ.addUser()
  }

}

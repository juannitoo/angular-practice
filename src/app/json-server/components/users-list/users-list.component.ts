import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { JsUsersService } from 'src/app/core/services/js-users.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor( private JsUsersService: JsUsersService) { }

  users! : Observable<User[]>;


  ngOnInit(): void {
    this.users = this.JsUsersService.getUsers()
  }

}

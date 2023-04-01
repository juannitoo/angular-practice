import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { JsUsersService } from 'src/app/core/services/js-users.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  constructor( private JsUsersService: JsUsersService) { }

  users$! : Observable<User[]>;

  errorSubscription! : Subscription
  errors = { 
    error: false, 
    message: ""
  }

  usersSubscription!: Subscription
  isServerResponse = false

  ngOnInit(): void {
    this.users$ = this.JsUsersService.getUsers()
    this.errorSubscription = this.JsUsersService.errors$.subscribe((err) => {
      console.log('eeee', err)
      if (err !== "") {
        this.errors.error = true
        this.errors.message = err
      }
    })
    
    this.usersSubscription = this.users$.subscribe((users)=>{
      if (users) this.isServerResponse = true
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
    this.usersSubscription.unsubscribe()
  }

}

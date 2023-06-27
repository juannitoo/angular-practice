import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { JsUsersService } from 'src/app/core/services/js-users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  constructor( private JsUsersService: JsUsersService,
              private errorsService: ErrorsService) { }

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
    this.errorSubscription = this.errorsService.httpErrors$.subscribe((err) => {
      if (err.message !== "") {
        this.isServerResponse = true
        this.errors.error = true
        this.errors.message = err.message
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

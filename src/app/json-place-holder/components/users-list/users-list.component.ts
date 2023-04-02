import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.services';
import { transition, trigger, useAnimation } from '@angular/animations';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger( 'slideText', [
      transition('void => *', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '500ms',
              delay: '0ms',
              direction: 'X',
              directionValue: '-100%'
          }
      })
    ])
  ])],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit { 

  users! : Observable<User[]>

  errorSubscription!: Subscription
  errors = {
    error: false,
    message: ""
  }
  
  usersSubscription! : Subscription
  isServerResponse = false

  constructor( private usersServ : UsersService) { }

  ngOnInit(): void {
    this.users = this.usersServ.users$
    this.usersServ.getUsers()

    this.errorSubscription = this.usersServ.errors$.subscribe((err) => {
      if (err) {
        this.isServerResponse = true
        this.errors.error = true
        this.errors.message = err
      }
    })
    
    this.usersSubscription = this.users.subscribe((users)=>{
      console.log('aaaa', )
      if (users) this.isServerResponse = true
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
    this.usersSubscription.unsubscribe()
  }


}

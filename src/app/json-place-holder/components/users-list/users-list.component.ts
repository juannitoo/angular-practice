import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Observable, Subscription, of } from 'rxjs';
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
export class UsersListComponent implements OnInit, OnDestroy { 

  users! : Observable<User[]>

  errorSubscription! : Subscription
  error! : Observable<boolean>
  message! : Observable<string>

  constructor( private usersServ : UsersService) { }

  ngOnInit(): void {
    this.users = this.usersServ.users$
    this.usersServ.getUsers()
    this.message = of("")
    this.errorSubscription = this.usersServ.errors$.subscribe( val => {
      if (val.error === true){
        this.error = of(val.error)
        this.message = of(val.message)
      }
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
  }
}

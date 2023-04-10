import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Observable, Subscription, of } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.services';
import { transition, trigger, useAnimation } from '@angular/animations';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';
import { ErrorsService } from 'src/app/core/services/errors.service';

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
  error! : boolean
  message! : string

  constructor( private usersServ : UsersService,
                private errorsService : ErrorsService,
                private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.users = this.usersServ.users$
    this.usersServ.getUsers()
    this.errorSubscription = this.errorsService.httpErrors$.subscribe( val => {
      if (val.message !== ""){
        this.error = true
        this.message = val.message
        this.changeDetector.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()
  }
}

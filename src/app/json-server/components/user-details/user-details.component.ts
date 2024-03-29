import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, map, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { JsUsersService } from 'src/app/core/services/js-users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  // lorsque url par ex user/1, user details
  user$! : Observable<User>;

  componentDestroyed$: Subject<void> = new Subject<void>()

  constructor(private jsUsersService: JsUsersService,
              private route : ActivatedRoute,
              private router : Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id']
    if (userId) {
      this.user$ = this.getUser(userId);
    }
  }

  //CRUD
  getUser(userId:number): Observable<User> {
    return this.jsUsersService.getUser(userId)
  }

  backToList(): Promise<boolean>{
    return this.router.navigateByUrl('json-server/users')
  }

  updateUser(userId:number): Promise<boolean>{
    return this.router.navigateByUrl(`json-server/users/update/${userId}`)
  }

  delUser(userId: number){
    return this.jsUsersService.deleteUser(userId).pipe(
      takeUntil(this.componentDestroyed$),
      tap( () => this.router.navigateByUrl('json-server/users')),
      catchError((err: HttpErrorResponse) => { throw `erreur dans delUser() json-server/users/: ${err}`})
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next()
    this.componentDestroyed$.complete()
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
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
  private delUserObs!: Subscription

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
    return this.delUserObs = this.jsUsersService.deleteUser(userId)
    .pipe(
      map( () => this.router.navigateByUrl('json-server/users')),
    ).subscribe({
      error: (error) => console.error(`erreur dans delUser() json-server/users/: ${error}`)
    });
  }

  ngOnDestroy(): void {
    if (this.delUserObs !== undefined) {
      this.delUserObs.unsubscribe()
    }
  }

}

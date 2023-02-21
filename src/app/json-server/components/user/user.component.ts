import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { JsUsersService } from 'src/app/core/services/js-users.services';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // enfant de la liste de user-list
  @Input() user!: User;

  // lorsque url par ex user/1
  user$! : Observable<User>;


  constructor(private jsUsersService: JsUsersService,
              private route : ActivatedRoute,
              private router : Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    if (userId) {
      this.user$ = this.getUser(userId);
    }
  }
  
  showUser(userId : number){
    return this.router.navigateByUrl(`json-server/users/${userId}`);
  }

  backToList(){
    return this.router.navigateByUrl('json-server/users');
  }

  //CRUD
  getUser(userId:number): Observable<User> {
    return this.jsUsersService.getUser(userId);
  }

  updateUser(userId:number){
    return this.router.navigateByUrl(`json-server/users/update/${userId}`);
  }

  delUser(userId: number){
    return this.jsUsersService.deleteUser(userId)
    .pipe(
      tap(() => console.log("user supprimé !") ),
      map( () => this.router.navigateByUrl('json-server/users'))
    ).subscribe();

  }

}


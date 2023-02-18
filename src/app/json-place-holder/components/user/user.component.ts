import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map} from 'rxjs/operators';
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

  // pour palier à l'update manquant
  modifUser! : boolean


  constructor(private usersService: UsersService,
              private route : ActivatedRoute,
              private router : Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    if (userId) {
      this.user$ = this.getUser(userId);
    }
    this.modifUser = false
  }
  
  showUser(userId : number){
    return this.router.navigateByUrl(`jsonplaceholder/users/${userId}`);
  }

  backToList(){
    return this.router.navigateByUrl('jsonplaceholder/users');
  }

  //CRUD
  getUser(userId:number): Observable<User> {
    return this.usersService.getUser(userId);
  }

  updateUser(userId:number){
      this.modifUser = true;
  }

  delUser(userId: number){
    return this.usersService.deleteUser(userId)
    .pipe(
      tap(() => console.log("user supprimé !") ),
      tap(() =>  this.modifUser = true ),
      // map( () => this.router.navigateByUrl('jsonplaceholder/users'))
    ).subscribe();

    //   // ca je garde pour batailler un peu.
    //   map((user) => { 
    //     const index = this.usersService.getUsers().pipe(
    //       map( util => [...util]),
    //       map( (util) => { 
    //         const index = util.findIndex((u)=> u.id === userId);
    //         util.splice(index,1);
    //         return util
    //       }),
    //       tap( util =>  console.log('les users modifiés', util)),
    //       map( (util) => this.router.navigateByUrl('jsonplaceholder/users'))
    //     //   map( (util) => this.router.navigate(['jsonplaceholder', 'users'], {
    //     //     "params" : util,
    //     //   }))
    //     ).subscribe();
    //   })
    // ).subscribe()

  }



}

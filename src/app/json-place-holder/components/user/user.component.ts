import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map, switchMap, delay} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  // enfant de la liste de user-list
  @Input() user!: User;

  // simulation delete
  @Output()
  usersChange : EventEmitter<Observable<User[]>> = new EventEmitter<Observable<User[]>>()

  // lorsque url par ex user/1
  user$! : Observable<User>;

  // pour palier à l'update manquant
  modifUser! : boolean

  // hack update
  formvalue!: string;

  //material accordion
  panelOpenState = false;


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
    this.formvalue =""; 
  }
  
  showUser(userId : number){
    return this.router.navigateByUrl(`jsonplaceholder/users/${userId}`);
  }

  // backToList(){
  //   return this.router.navigateByUrl('jsonplaceholder/users');
  // }

  //CRUD
  getUser(userId:number): Observable<User> {
    return this.usersService.getUser(userId);
  }

  updateUser(userId:number, formValue: string){
    return this.usersService.updateUser(userId, formValue)
    .pipe(
      tap(() =>  this.modifUser = true ),
      tap(() => console.log("user updaté !") ),
      delay(6000),
      tap(() =>  this.modifUser = false ),
      // map( () => this.router.navigateByUrl('jsonplaceholder/users'))
    ).subscribe();
  }

  delUser(userId: number){
    // return this.usersService.deleteUser(userId).pipe(
    //   tap(() =>  this.modifUser = true ),
    //   delay(6000),
    //   tap(() =>  this.modifUser = false ),
    //   // map( () => this.router.navigateByUrl('jsonplaceholder/users'))
    // ).subscribe();
  }



}

import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
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

  // remonte les users modifiés suite à un delete
  @Output()
  usersChange : EventEmitter<Observable<User[]>> = new EventEmitter<Observable<User[]>>()

  // lorsque url par ex user/1
  user$! : Observable<User | undefined>;

  //material accordion
  panelOpenState = false;


  constructor(private usersService: UsersService,
              private route : ActivatedRoute,
              private router : Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    if (userId) {
      this.user$ = this.onGetUser(userId);
    }
  }
  
  showUser(userId : number){
    return this.router.navigateByUrl(`jsonplaceholder/users/update/${userId}`)
  }

  //CRUD
  onGetUser(userId:number): Observable<User> {
    return this.usersService.getUser(userId)
  }

  onDelUser(userId: number): void{
    return this.usersService.deleteUser(userId)
  }

}

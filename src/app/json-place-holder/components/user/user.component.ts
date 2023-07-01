import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  @Input() user!: User
  userId! : number
  //material accordion
  panelOpenState = false;
  // pour savoir si afficher les pseudos ds accordeon
  isSmartPhone = false

  constructor(private usersService: UsersService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id']
    this.isSmartPhone = this.testClientWidth()
  }
  
  showUser(userId : number){
    return this.router.navigateByUrl(`jsonplaceholder/users/update/${userId}`)
  }

  testClientWidth() : boolean {
    return document.getElementsByTagName('html')[0].clientWidth > 700 ? false : true
  }

  //CRUD
  onGetUser(userId:number): Observable<User> {
    return this.usersService.getUser(userId)
  }

  onDelUser(userId: number): void{
    return this.usersService.deleteUser(userId)
  }


}

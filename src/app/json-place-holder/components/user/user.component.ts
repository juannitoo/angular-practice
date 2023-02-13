import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // enfant de la liste de user-list
  @Input() user!: User;
  // lorsque url par ex user/1
  user$! : Observable<User>
  buttonText! : string;

  constructor(private usersService: UsersService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.buttonText = "Afficher"
    const userId = +this.route.snapshot.params['id']
    if (userId) {
      this.user$ = this.getUser(userId);
      this.buttonText = "Retour à la liste"
    }
  }
  
  getUser(userId:number): Observable<User> {
    return this.usersService.getUser(userId);
  }

  showUser(userId : number){
    return this.router.navigateByUrl(`jsonplaceholder/users/${userId}`)
  }

  backToList(){
    return this.router.navigateByUrl('jsonplaceholder/users')
  }

}

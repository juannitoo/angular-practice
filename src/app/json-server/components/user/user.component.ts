import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  // enfants de la liste de user-list
  @Input() user!: User;

  constructor(private router : Router) { }

  showUser(userId : number): Promise<boolean>{
    return this.router.navigateByUrl(`json-server/users/${userId}`);
  }

}


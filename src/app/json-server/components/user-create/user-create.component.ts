import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { JsUsersService } from 'src/app/core/services/js-users.services';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm! : FormGroup

  constructor( private formBuilder: FormBuilder,
                private jsUsersService: JsUsersService,
                private router: Router ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name : [null],
      username : [null],
      email : [null],
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    });
  }

  onSubmitForm(): any {
    // console.log(this.userForm.value);
    this.jsUsersService.addUser(this.userForm.value).pipe(
      tap(() => this.router.navigateByUrl('json-server/users'))
    ).subscribe()
  }

}

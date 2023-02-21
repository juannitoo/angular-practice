import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JsUsersService } from 'src/app/core/services/js-users.services';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userForm! : FormGroup
  userId! : number

  constructor( private formBuilder: FormBuilder,
                private jsUsersService: JsUsersService,
                private router: Router,
                private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id']
    this.userForm = this.formBuilder.group({
      name : [null],
      username : [null],
      email : [null],
      addressCity : [null],
      phone : [null],
      website : [null],
      companyName : [null]
    });
    this.jsUsersService.getUser(this.userId).pipe(
      map(
        (user)=>{
          this.userForm.controls['name'].setValue(user.name)
          this.userForm.controls['username'].setValue(user.username)
          this.userForm.controls['email'].setValue(user.email)
          this.userForm.controls['addressCity'].setValue(user.address?.city)
          this.userForm.controls['phone'].setValue(user.phone)
          this.userForm.controls['website'].setValue(user.website)
          this.userForm.controls['companyName'].setValue(user.company?.name)
        }
      )
    ).subscribe()
    
  }

  onSubmitForm(userId: number): void {
    this.jsUsersService.updateUser( userId, this.userForm.value).pipe(
      tap(() => this.router.navigateByUrl('json-server/users'))
    ).subscribe()
  }

}

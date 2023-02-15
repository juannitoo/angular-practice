import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm!: FormGroup;

  constructor( private formBuider: FormBuilder ) { }

  ngOnInit(): void {
    this.userCreateForm = this.formBuider.group({
      name: [null],
      username: [null],
      email: [null],
      city: [null],
      phone: [null],
      website: [null],
      company: [null],
    })
  }

  onSubmitForm() {
    console.log(this.userCreateForm.value);
  }

}

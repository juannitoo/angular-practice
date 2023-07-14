import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.services';

@Component({
  selector: 'app-json-landing',
  templateUrl: './json-landing.component.html',
  styleUrls: ['./json-landing.component.scss']
})
export class JsonLandingComponent implements OnInit{

  data!: any

  constructor(private usersService: UsersService,) { }

  ngOnInit(): void {
    this.data = this.usersService.getData()
  }

}

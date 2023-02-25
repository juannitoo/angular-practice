import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { JsonPlaceHoldeRoutingModule } from './json-place-holder-routing.module';
import { UserComponent } from './components/user/user.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../core/services/users.services';



@NgModule({
  declarations: [
    JsonLandingComponent,
    UsersListComponent,
    UserComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    JsonPlaceHoldeRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    UsersService
  ]
})
export class JsonPlaceHolderModule { }

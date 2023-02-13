import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { JsonPlaceHoldeRoutingModule } from './json-place-holder-routing.module';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    JsonLandingComponent,
    UsersListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    JsonPlaceHoldeRoutingModule
  ]
})
export class JsonPlaceHolderModule { }

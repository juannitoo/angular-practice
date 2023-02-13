import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { JsonPlaceHoldeRoutingModule } from './json-place-holder-routing.module';



@NgModule({
  declarations: [
    JsonLandingComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    JsonPlaceHoldeRoutingModule
  ]
})
export class JsonPlaceHolderModule { }

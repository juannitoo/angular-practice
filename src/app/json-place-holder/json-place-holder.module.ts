import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UsersComponent } from './components/users/users.component';
import { JsonPlaceHoldeRoutingModule } from './json-place-holder-routing.module';



@NgModule({
  declarations: [
    JsonLandingComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    JsonPlaceHoldeRoutingModule
  ]
})
export class JsonPlaceHolderModule { }

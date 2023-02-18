import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonServerRoutingModule } from './json-server-routing.module';
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component';


@NgModule({
  declarations: [
    JsonServerLandingComponent
  ],
  imports: [
    CommonModule,
    JsonServerRoutingModule
  ]
})
export class JsonServerModule { }

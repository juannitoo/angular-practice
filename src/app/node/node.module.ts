import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';
import { NodeLandingComponent } from './node-landing/node-landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NodeLandingComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    NodeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NodeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeRoutingModule } from './node-routing.module';
import { NodeLandingComponent } from './node-landing/node-landing.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    NodeLandingComponent,
  ],
  imports: [
    CommonModule,
    NodeRoutingModule,
    AuthModule,
  ]
})
export class NodeModule { }

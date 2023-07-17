import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeRoutingModule } from './node-routing.module';
import { NodeLandingComponent } from './node-landing/node-landing.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NodeLandingComponent,
  ],
  imports: [
    CommonModule,
    NodeRoutingModule,
    AuthModule,
    SharedModule
  ]
})
export class NodeModule { }

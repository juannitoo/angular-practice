import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodeLandingComponent } from './node-landing/node-landing.component';

const routes: Routes = [
  { path : '', component: NodeLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodeRoutingModule { }

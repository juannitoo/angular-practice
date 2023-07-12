import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodeLandingComponent } from './node-landing/node-landing.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { path : '', component: NodeLandingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodeRoutingModule { }

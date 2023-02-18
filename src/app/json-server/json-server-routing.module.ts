import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component';

const routes: Routes = [
  { path: '', component: JsonServerLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonServerRoutingModule { }

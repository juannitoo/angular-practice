import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';

const routes: Routes = [
    { path : '', component: JsonLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonPlaceHoldeRoutingModule { }
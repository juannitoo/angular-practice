import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
    { path : '', component: JsonLandingComponent },
    { path: 'users', component: UsersListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonPlaceHoldeRoutingModule { }
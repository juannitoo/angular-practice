import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: 'users/create', component: UserCreateComponent},
  { path: 'users/:id', component: UserComponent},
  { path: 'users', component: UsersListComponent},
  { path: '', component: JsonServerLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonServerRoutingModule { }

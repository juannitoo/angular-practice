import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonLandingComponent } from './components/json-landing/json-landing.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: 'users/update/:id', component: UserUpdateComponent, title:"Modifier les datas du user" },
  { path: 'users/create', component: UserCreateComponent, title:"Créez un user" },
  { path: 'users/:id', component: UserComponent },
  { path: 'users', component: UsersListComponent, title:"Les users de JsonPlaceHolder"  },
  { path : '', component: JsonLandingComponent, title:"Présentation de l'exercice JsonPlaceHolder" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonPlaceHoldeRoutingModule { }
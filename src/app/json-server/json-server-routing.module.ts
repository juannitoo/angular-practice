import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes = [  
  { path: 'users/update/:id', component: UserUpdateComponent, title:" Modifiez un utilisateur"},
  { path: 'users/create', component: UserCreateComponent, title:" Créez un utilisateur"},
  { path: 'users/:id', component: UserDetailsComponent, title:"Informations personnelles de l'utilisateur"},
  { path: 'users', component: UsersListComponent, title:"Les users présents sur le serveur"},
  { path: '', component: JsonServerLandingComponent, title:"Présentation de l'exercice json-server"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonServerRoutingModule { }

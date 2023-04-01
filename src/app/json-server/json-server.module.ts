import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonServerRoutingModule } from './json-server-routing.module';
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { JsUsersService } from '../core/services/js-users.services';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JsonServerLandingComponent,
    UsersListComponent,
    UserComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    JsonServerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers : [
    JsUsersService
  ]
})
export class JsonServerModule { }

import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UserComponent } from "./components/user/user.component"
import { UserCreateComponent } from "./components/user-create/user-create.component"
import { UserUpdateComponent } from "./components/user-update/user-update.component"
import { UserDetailsComponent } from "./components/user-details/user-details.component"
import { UsersListComponent } from "./components/users-list/users-list.component"
import { JsonServerLandingComponent } from "./components/json-server-landing/json-server-landing.component"
import { RouterTestingModule } from "@angular/router/testing"
import { JsonServerRoutingModule } from "./json-server-routing.module"
import { ReactiveFormsModule } from "@angular/forms"
import { SharedModule } from "../shared/shared.module"
import { JsUsersService } from "../core/services/js-users.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"


describe('Json-Server Module', () => {
  let fixture : ComponentFixture<JsonServerLandingComponent>
  let component: JsonServerLandingComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,
                      UserCreateComponent,
                      UserUpdateComponent,
                      UserDetailsComponent,
                      UsersListComponent,
                      JsonServerLandingComponent
                     ],
      imports: [RouterTestingModule, 
                ReactiveFormsModule, 
                SharedModule,
                HttpClientTestingModule
              ],
      providers : [ JsonServerRoutingModule, JsUsersService ]
    })
    fixture = TestBed.createComponent(UserCreateComponent)
    component = fixture.componentInstance
  })

  it('should start !', () => {
    expect(component).toBeTruthy()
  })
})
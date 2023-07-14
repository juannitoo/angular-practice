import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { JsonPlaceHolderModule } from "./json-place-holder.module"
import { JsonLandingComponent } from "./components/json-landing/json-landing.component"
import { UserComponent } from "./components/user/user.component"
import { UserCreateComponent } from "./components/user-create/user-create.component"
import { UserUpdateComponent } from "./components/user-update/user-update.component"
import { UserDetailsComponent } from "../json-server/components/user-details/user-details.component"
import { UsersListComponent } from "./components/users-list/users-list.component"
import { RouterTestingModule } from "@angular/router/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { SharedModule } from "../shared/shared.module"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { UsersService } from "../core/services/users.services"
import { JsonPlaceHoldeRoutingModule } from "./json-place-holder-routing.module"


describe('Json-Place-Holder Module', () => {
  let fixture : ComponentFixture<JsonPlaceHolderModule>
  let component: JsonLandingComponent

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,
                      UserCreateComponent,
                      UserUpdateComponent,
                      UserDetailsComponent,
                      UsersListComponent,
                      JsonLandingComponent
                     ],
      imports: [RouterTestingModule, 
                ReactiveFormsModule, 
                SharedModule,
                HttpClientTestingModule
              ],
      providers : [ JsonPlaceHoldeRoutingModule, UsersService ]
    })
  }))
  
  xit('should start !', () => {
    fixture = TestBed.createComponent(UserCreateComponent)
    // component = fixture.componentInstance
    // expect(component).toBeTruthy()
  })
})
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { ReactiveFormsModule } from "@angular/forms"
import { AuthService } from "src/app/core/services/auth.service"
import { of } from "rxjs"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"


describe('Login Component', () => {

    let component : LoginComponent
    let fixture : ComponentFixture<LoginComponent>
    let mockAuthService : jasmine.SpyObj<AuthService>

    beforeEach( 
      waitForAsync( () => {

        mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', {
          login : of(true),
          signUp : of(true)
        })
        
        TestBed.configureTestingModule({
          declarations: [ LoginComponent ],
          imports: [  
                      ReactiveFormsModule,
                    ],
          providers: [ { provide: AuthService, useValue: mockAuthService } ],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents()
        .then( () => {
          fixture = TestBed.createComponent(LoginComponent)
          component = fixture.componentInstance
          fixture.detectChanges()
        })
      })
    )

    it('should create loginComponent', () => {
      expect(component).toBeTruthy()
    })

})
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { UserComponent } from './user.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { JsUsersService } from 'src/app/core/services/js-users.services'
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { DebugElement } from '@angular/core'
import { Router, Routes } from '@angular/router'
// import { UserCreateComponent } from '../user-create/user-create.component'

describe('Json-Server User Component', () => {
  let component: UserComponent
  let fixture : ComponentFixture<UserComponent>
  let cssUser: DebugElement

  let users = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  ]

  const testRoutes: Routes = [
    {
      path: 'json-server/users',
      component: UserComponent
    },
    {
      path: 'json-server/users/1',
      component: UserComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ]

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [  NoopAnimationsModule, 
                  HttpClientTestingModule, 
                  RouterTestingModule.withRoutes(testRoutes)
                ],
      providers: [ JsUsersService ]
    }).compileComponents()
  })

  beforeEach( () => {
    fixture = TestBed.createComponent(UserComponent)
    component = fixture.componentInstance
    component.user = users[0] //simu @Input()
    fixture.detectChanges()
    cssUser = fixture.debugElement.query(By.css('.user'))
    fixture.detectChanges()
  })
  
  it('should create component json-server/UserComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should match user name json-server/UserComponent', () => {
    expect(component.user.name).toBe("Leanne Graham")
  })

  it('should show user details on click', fakeAsync(() => {
    cssUser.triggerEventHandler('click')
    tick()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users/1')
  }))

})
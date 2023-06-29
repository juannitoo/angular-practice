import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { UserUpdateComponent } from './user-update.component'
import { DebugElement, NgZone } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { UsersListComponent } from '../users-list/users-list.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { JsUsersService } from 'src/app/core/services/js-users.service'
import { ReactiveFormsModule } from '@angular/forms'
import { User } from 'src/app/core/models/user.model'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'

describe('Json-Server user-update Component', () => {
  let component: UserUpdateComponent
  let fixture : ComponentFixture<UserUpdateComponent>
  let button: DebugElement
  let mockJsUserService: jasmine.SpyObj<JsUsersService>
  let updateUserSpy : jasmine.Spy
  let getUserSpy : jasmine.Spy
  let ngZone: NgZone

  let data: Object = {
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "addressCity": "Gwenborough",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "companyName": "Romaguera-Crona",
  }

  let user: User = {
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

  const testRoutes: Routes = [
    {
      path: 'json-server/users/update/1',
      component: UserUpdateComponent
    },
    {
      path: 'json-server/users',
      component: UsersListComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ]

  beforeEach( waitForAsync( () => {

    mockJsUserService = jasmine.createSpyObj<JsUsersService>('JsUsersService', ['updateUser', 'getUser'])
    updateUserSpy = mockJsUserService.updateUser.and.returnValue(of(user))
    getUserSpy = mockJsUserService.getUser.and.returnValue(of(user))

    TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ],
      imports: [  HttpClientTestingModule, 
                  RouterTestingModule.withRoutes(testRoutes),
                  ReactiveFormsModule,
                ],
      providers: [ { provide: JsUsersService, useValue: mockJsUserService } ]
    }).compileComponents()
  }))

  beforeEach(  () => {
    fixture = TestBed.createComponent(UserUpdateComponent)
    ngZone = TestBed.inject(NgZone)
    component = fixture.componentInstance
    component.userId = 1
    fixture.detectChanges()
  })

  it('should create component json-server/UserCreateComponent', () => {
    expect(component).toBeTruthy()
  })

  it("should have go back button", () => {
    button = fixture.debugElement.query(By.css('#retour'))

    expect(button).toBeTruthy()
  })

  it("should have a submit button", () => {
    button = fixture.debugElement.query(By.css('button[type=submit]'))
    expect(button).toBeTruthy()
  })

  it("should have 7 inputs with formControlname attribute in template", () => {
    let inputs = fixture.debugElement.queryAll(By.css('input[formControlName]'))
    let inputsNumber = 7
    expect(inputs.length).toEqual(inputsNumber)
  })

  it('should update user and navigate to users-list on submit button click', fakeAsync(() => {
    component.userForm.setValue({ ...data })
    component.userForm.updateValueAndValidity()
    ngZone.run(() => component.onSubmitForm(component.userId))
    tick()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

})
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { UserCreateComponent } from './user-create.component'
import { JsUsersService } from 'src/app/core/services/js-users.service'
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { DebugElement } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { By } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { UsersListComponent } from '../users-list/users-list.component'
import { of } from 'rxjs'
import { User } from 'src/app/core/models/user.model'


describe('Json-Server user-create Component', () => {
  let component: UserCreateComponent
  let fixture : ComponentFixture<UserCreateComponent>
  let button: DebugElement
  let mockJsUserService: jasmine.SpyObj<JsUsersService>
  let addUserSpy : jasmine.Spy

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
      path: 'json-server/users/create',
      component: UserCreateComponent
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

  beforeEach( async () => {

    mockJsUserService = jasmine.createSpyObj<JsUsersService>('JsUsersService', ['getUser', 'deleteUser', 'addUser'])
    addUserSpy = mockJsUserService.addUser.and.returnValue(of(user))

    await TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
      imports: [  HttpClientTestingModule, 
                  RouterTestingModule.withRoutes(testRoutes),
                  ReactiveFormsModule,
                ],
      providers: [ { provide: JsUsersService, useValue: mockJsUserService } ]
    }).compileComponents()
  })

  beforeEach( () => {
    fixture = TestBed.createComponent(UserCreateComponent)
    component = fixture.componentInstance
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

  it("should navigate to users-list on close", fakeAsync(() => {
    button = fixture.debugElement.query(By.css('#retour'))
    button.triggerEventHandler('click')
    tick()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

  it("should have 7 inputs with formControlname attribute in template", () => {
    let inputs = fixture.debugElement.queryAll(By.css('input[formControlName]'))
    let inputsNumber = 7
    expect(inputs.length).toEqual(inputsNumber)
  })

  it('should add user and navigate to users-list on submit button click', fakeAsync(() => {
    component.userForm.setValue({ ...data })
    component.userForm.updateValueAndValidity()
    component.onSubmitForm()
    tick()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

})
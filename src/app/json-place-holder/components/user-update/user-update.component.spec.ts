import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { UserUpdateComponent } from './user-update.component'
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NgZone } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { UsersListComponent } from '../users-list/users-list.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { UsersService } from 'src/app/core/services/users.services'
import { ReactiveFormsModule } from '@angular/forms'
import { User } from 'src/app/core/models/user.model'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('JsonPlaceHolder user-update Component', () => {
  let component: UserUpdateComponent
  let fixture : ComponentFixture<UserUpdateComponent>
  let button: DebugElement
  let mockUserService: jasmine.SpyObj<UsersService>
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
      path: 'jsonplaceholder/users/update/1',
      component: UserUpdateComponent
    },
    {
      path: 'jsonplaceholder/users',
      component: UsersListComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ]

  beforeEach( waitForAsync( () => {

    mockUserService = jasmine.createSpyObj<UsersService>('UsersService', ['updateUser', 'getUser'])
    updateUserSpy = mockUserService.updateUser.and.returnValue(of(user))
    getUserSpy = mockUserService.getUser.and.returnValue(of(user))

    TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ],
      imports: [  NoopAnimationsModule,
                  HttpClientTestingModule, 
                  RouterTestingModule.withRoutes(testRoutes),
                  ReactiveFormsModule,
                ],
      providers: [ { provide: UsersService, useValue: mockUserService } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents()
  }))

  beforeEach(  () => {
    fixture = TestBed.createComponent(UserUpdateComponent)
    ngZone = TestBed.inject(NgZone)
    component = fixture.componentInstance
    component.userId = 1
    fixture.detectChanges()
  })

  it('should create component jsonplaceholder/UserUpdateComponent', () => {
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

  // il en manque bcp là mais je reviendrai dessus en temps voulu car le form n'est pas optimal,
  // il nécessite pas mal d'ajustements et de travail.

})
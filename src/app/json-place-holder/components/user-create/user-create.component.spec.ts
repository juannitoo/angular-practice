import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing"
import { UserCreateComponent } from "./user-create.component"
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, DebugElement, NgZone } from "@angular/core"
import { UsersService } from "src/app/core/services/users.services"
import { User } from "src/app/core/models/user.model"
import { Router, RouterEvent, Routes } from "@angular/router"
import { UsersListComponent } from "../users-list/users-list.component"
import { of } from "rxjs"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { By } from "@angular/platform-browser"


describe('JsonPlaceHolder user-create Component', () => {
  let component: UserCreateComponent
  let fixture : ComponentFixture<UserCreateComponent>
  let button: DebugElement
  let mockUserService: jasmine.SpyObj<UsersService>
  let addUserSpy : jasmine.Spy
  let ngZone: NgZone
  let changeDetector: ChangeDetectorRef

  let data: Object = {
    "name": "Leanne Graham",
    "username": "Bret",
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
      path: 'jsonplaceholder/users/create',
      component: UserCreateComponent
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

    mockUserService = jasmine.createSpyObj<UsersService>('UsersService', ['getUser', 'addUser'])
    addUserSpy = mockUserService.addUser

    TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
      imports: [  NoopAnimationsModule,
                  HttpClientTestingModule, 
                  RouterTestingModule.withRoutes(testRoutes),
                  ReactiveFormsModule,
                ],
      providers: [ { provide: UsersService, useValue: mockUserService },
                      ChangeDetectorRef ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).overrideComponent(UserCreateComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    }).compileComponents()
  }))

  beforeEach( () => {
    fixture = TestBed.createComponent(UserCreateComponent)
    ngZone = TestBed.inject(NgZone)
    changeDetector = TestBed.inject(ChangeDetectorRef)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  
  it('should create component JsonPlaceHolder/UserCreateComponent', () => {
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

  it("should have 2 inputs with formControlname attribute in template", () => {
    let inputs = fixture.debugElement.queryAll(By.css('input[formControlName]'))
    let inputsNumber = 2
    expect(inputs.length).toEqual(inputsNumber)
  })

  xit("should navigate to users-list on close", fakeAsync(() => {
    button = fixture.debugElement.query(By.css('#retour'))
    ngZone.run(() => button.triggerEventHandler('click'))
    tick()
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

  xit('should add user and navigate to users-list on submit button click', fakeAsync(() => {
    component.userCreateForm.setValue({ ...data })
    component.userCreateForm.updateValueAndValidity()
    ngZone.run(() => component.onSubmitForm())
    tick()
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

})
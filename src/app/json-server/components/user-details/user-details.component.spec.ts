import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing"
import { UserDetailsComponent } from "./user-details.component";
import { JsUsersService } from "src/app/core/services/js-users.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { UserComponent } from "../user/user.component";
import { DebugElement } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { UserUpdateComponent } from "../user-update/user-update.component";


describe('Json-Server user-details component', () => {
  let component: UserDetailsComponent
  let fixture : ComponentFixture<UserDetailsComponent>
  let mockJsUserService: jasmine.SpyObj<JsUsersService>
  let getUserSpy : jasmine.Spy
  let deleteUserSpy : jasmine.Spy
  let button: DebugElement
  let fullname: string

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
  let user$ = of(users[0])

  const testRoutes: Routes = [
    {
      path: 'json-server/users/1',
      component: UserDetailsComponent
    },
    {
      path: 'json-server/users',
      component: UserComponent
    },
    {
      path: 'json-server/users/update/1',
      component: UserUpdateComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ]

  beforeEach( waitForAsync( () => {

    mockJsUserService = jasmine.createSpyObj<JsUsersService>('JsUsersService', ['getUser', 'deleteUser'])
    getUserSpy = mockJsUserService.getUser.and.returnValue(user$)
    deleteUserSpy = mockJsUserService.deleteUser.and.returnValue(user$)

    TestBed.configureTestingModule({
      declarations:[ UserDetailsComponent],
      imports : [ HttpClientTestingModule,
                  RouterTestingModule.withRoutes(testRoutes) ],
      providers: [ { provide: JsUsersService, useValue: mockJsUserService } ]
    }).compileComponents()

  }))

  beforeEach( () => {
    fixture = TestBed.createComponent(UserDetailsComponent)
    component = fixture.componentInstance
    component.user$ = component.getUser(5)
    fixture.detectChanges()
  })


  it("should create component with Obs | async", () => {
    expect(component).toBeTruthy()
  })

  it("should show good user fullname", () => {
    fullname = fixture.debugElement.query(By.css('#name')).nativeElement.textContent
    expect(fullname).toBe("Leanne Graham")
  })

  it("should have Close button", () => {
    button = fixture.debugElement.query(By.css('#fermer'))
    expect(button).toBeTruthy()
  })

  it("should have Update button", () => {
    button = fixture.debugElement.query(By.css('#update'))
    expect(button).toBeTruthy()
  })

  it("should have Delete button", () => {
    button = fixture.debugElement.query(By.css('#suppression'))
    expect(button).toBeTruthy()
  })

  it("should navigate to users-list on close", fakeAsync(() => {
    button = fixture.debugElement.query(By.css('#fermer'))
    button.triggerEventHandler('click')
    tick()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

  it("should navigate to update-user page on click", fakeAsync(() => {
    button = fixture.debugElement.query(By.css('#update'))
    button.triggerEventHandler('click')
    tick()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users/update/1')
  }))

  it("should navigate to users-list on user suppression", fakeAsync(() => {
    button = fixture.debugElement.query(By.css('#suppression'))
    component.delUser(1)
    tick()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/json-server/users')
  }))

})
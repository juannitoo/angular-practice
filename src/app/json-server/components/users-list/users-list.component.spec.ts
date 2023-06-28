import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing'
import { UsersListComponent } from './users-list.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { JsUsersService } from 'src/app/core/services/js-users.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ErrorsService } from 'src/app/core/services/errors.service'
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'
import { Router, RouterLink, Routes } from '@angular/router'
import { UserCreateComponent } from '../user-create/user-create.component'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'


describe('json-server users-list Component', () => {
  let component: UsersListComponent
  let fixture : ComponentFixture<UsersListComponent>
  let title: HTMLElement
  let progressBar: DebugElement
  let appError: DebugElement
  let addUserLink: DebugElement
  let jsUsersService : JsUsersService

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
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    }
  ]

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent, UserCreateComponent ],
      imports: [  NoopAnimationsModule, 
                  HttpClientTestingModule,
                  RouterTestingModule,
                  RouterLink] ,
      providers : [ JsUsersService, ErrorsService ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents()
  })

  beforeEach( () => {
    fixture = TestBed.createComponent(UsersListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    title = fixture.debugElement.query(By.css('h1')).nativeElement
    progressBar = fixture.debugElement.query(By.css('mat-progress-bar'))
    component.isServerResponse = false
    component.errors.error = false
  })

  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should return h1', () => {
    expect(title.textContent).toBe("Les users du serveur local")
  })

  it('should show progress bar while waiting', () => {
    expect(progressBar.attributes).not.toEqual({})
  })

  it('should hide progress bar on server response', fakeAsync(() => {
    component.isServerResponse = true
    fixture.detectChanges()
    expect(progressBar.attributes).toEqual({})
  }))

  it('should have link to addUser page with routerlink directive', fakeAsync(() => {
    component.isServerResponse = true
    component.errors.error = false
    fixture.detectChanges()
    addUserLink = fixture.debugElement.query(By.directive(RouterLink))
    expect(addUserLink).toBeTruthy()
    expect(addUserLink.nativeElement.href).toContain('/create')
    // Expected 'http://localhost:9876/create' toBe '/create' so toContain
  }))

  it('should show error message when needed', fakeAsync(() => {
    component.isServerResponse = true
    component.errors.error = true
    fixture.detectChanges()
    appError = fixture.debugElement.query(By.css('app-error'))
    expect(appError).toBeTruthy()
  }))

  it('should show users', fakeAsync(() => {
    component.isServerResponse = true
    component.errors.error = false
    component.users$ = of(users) // sans ca, app-user vaut null et pas de users !
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('app-user'))).not.toBeNull()

    // c'est plutôt comme ca dans la doc officielle, mais ca ne fonctionne pas ici !
    
    // jsUsersService = TestBed.inject(JsUsersService)
    // spyOn(jsUsersService, 'getUsers').and.returnValue(of(users))
    // jsUsersService.getUsers().subscribe((res) => {
    //   console.log(res) // affiche les users mais n'instancie pas le component via | async
    //   fixture.detectChanges()
    //   expect(fixture.debugElement.query(By.css('app-user'))).not.toBeNull()
    // })

  }))

})
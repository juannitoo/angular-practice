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


describe('json-server users-list Component', () => {
  let component: UsersListComponent
  let fixture : ComponentFixture<UsersListComponent>
  let title: HTMLElement
  let progressBar: DebugElement
  let appError: DebugElement
  let addUserLink: DebugElement

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

  it('should have link to add user page with routerlink directive', fakeAsync(() => {
    component.isServerResponse = true
    component.errors.error = false
    fixture.detectChanges()
    addUserLink = fixture.debugElement.query(By.directive(RouterLink))
    expect(addUserLink).toBeTruthy()
    expect(addUserLink.nativeElement.href).toContain('/create')
    // Expected 'http://localhost:9876/create' to be '*/create'. so contain
  }))

  it('should show error message when needed', fakeAsync(() => {
    component.isServerResponse = true
    component.errors.error = true
    fixture.detectChanges()
    appError = fixture.debugElement.query(By.css('app-error'))
    expect(appError).toBeTruthy()
  }))

})
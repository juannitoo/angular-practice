import { TestBed, ComponentFixture } from '@angular/core/testing'
import { UsersListComponent } from './users-list.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { JsUsersService } from 'src/app/core/services/js-users.services'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ErrorsService } from 'src/app/core/services/errors.service'
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core'


describe('json-server users-list Component', () => {
  let component: UsersListComponent
  let fixture : ComponentFixture<UsersListComponent>
  let title: HTMLElement
  let addUserLink: HTMLElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports: [  NoopAnimationsModule, HttpClientTestingModule] ,
      providers : [ JsUsersService, ErrorsService ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .createComponent(UsersListComponent)
  
    fixture.detectChanges()

    component = fixture.componentInstance
    title = fixture.debugElement.query(By.css('h1')).nativeElement
    // addUserLink = fixture.debugElement.query(By.css('.adduser'))?.nativeElement
    // a l'intérieur de ng-container, je ne sais pas faire
  })


  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should return h1', () => {
    expect(title.textContent).toBe("Les users du serveur local")
  })

  xit('should have link to add a user', () => {
    expect(addUserLink.textContent).toBe("Ajoutez un user")
  })


})
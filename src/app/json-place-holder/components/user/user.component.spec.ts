import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import { UserComponent } from './user.component'
import { UsersService } from 'src/app/core/services/users.services'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, DebugElement, NgZone } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { UserUpdateComponent } from '../user-update/user-update.component'


describe('Json-Server User Component', () => {
  let component: UserComponent
  let fixture : ComponentFixture<UserComponent>
  let ngZone: NgZone
  let updateButton: DebugElement
  let deleteButton: DebugElement
  let mockUsersService: jasmine.SpyObj<UsersService>
  let testClientWidthSpy: jasmine.Spy

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
      path: 'jsonplaceholder/users/update/1',
      component: UserUpdateComponent
    },
    // {
    //   path: '**',
    //   redirectTo: '',
    //   pathMatch: 'full'
    // }
  ]

  beforeEach( 
    waitForAsync( () => {
      mockUsersService = jasmine.createSpyObj<UsersService>('UsersService', ['getUsers'])
     
      TestBed.configureTestingModule({
        declarations: [ UserComponent ],
        imports: [  NoopAnimationsModule, 
                    HttpClientTestingModule, 
                    RouterTestingModule.withRoutes(testRoutes)
                  ],
        providers: [{ provide: UsersService, useValue: mockUsersService } ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      }).overrideComponent(UserComponent, {
        set: {  changeDetection: ChangeDetectionStrategy.Default  }
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(UserComponent)
        ngZone = TestBed.inject(NgZone)
        component = fixture.componentInstance
        component.user = users[0]
        fixture.detectChanges()
        testClientWidthSpy = spyOn(component, 'testClientWidth')
        updateButton = fixture.debugElement.query(By.css('#btn-update'))
        deleteButton = fixture.debugElement.query(By.css('#btn-delete'))
      })
    })
  )
  
  it('should create component json-server/UserComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should begin with users-panel closed', () => {
    expect(component.panelOpenState).toBeFalse()
  })

  it('should begin showing user fullname on user-panel', () => {
    expect(component.user.name).toBe("Leanne Graham")
  })

  it('should have isSmartphone set to false on start', () => {
    expect(component.isSmartPhone).toBeFalse()
  })

  it('should call testClientWidth() on Init', () => {
    component.ngOnInit()
    expect(testClientWidthSpy).toHaveBeenCalled()
  })

  it('should show user details', fakeAsync(() => {
    let userEmail = fixture.debugElement.query(By.css('#email')).nativeElement.textContent
    expect(userEmail).toEqual('Email : Sincere@april.biz ')
  }))

  it('should have update and delete button', fakeAsync(() => {
    expect(updateButton).toBeTruthy()
    expect(deleteButton.nativeElement.textContent).toContain("Supprimer")
  }))

  it('should navigate to update page on update button click', fakeAsync(() => {
    expect(updateButton).toBeTruthy()
    ngZone.run(() =>{
      updateButton.triggerEventHandler('click')
    })
    tick()
    fixture.detectChanges()
    expect(TestBed.inject(Router).url).toEqual('/jsonplaceholder/users/update/1')
  }))

})
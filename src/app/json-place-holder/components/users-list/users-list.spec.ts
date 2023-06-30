import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { UsersService } from "src/app/core/services/users.services";
import { UsersListComponent } from "./users-list.component";
import { ErrorsService } from "src/app/core/services/errors.service";
import { RouterLink } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

// NoopAnimations pour enlever les anims
// https://stackoverflow.com/questions/55927441/how-can-i-test-a-modals-elements-with-ng-template-and-the-action-that-triggers
// https://stackoverflow.com/questions/40895855/testing-onpush-components-in-angular-2

describe('jsonPlaceHolder Users-list component', () => {

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

  let fixture: ComponentFixture<UsersListComponent>
  let container: DebugElement
  let article: DebugElement
  let appError: DebugElement
  let component: UsersListComponent
  let mockUsersService: jasmine.SpyObj<UsersService>
  let getUsersSpy : jasmine.Spy
  let changeDetector: ChangeDetectorRef
  
  beforeEach( 
    waitForAsync(() => { 
      mockUsersService = jasmine.createSpyObj<UsersService>('UsersService', ['getUsers', 'deleteUser'])
      getUsersSpy = mockUsersService.getUsers.and.returnValue(of(users))
      
      TestBed.configureTestingModule({
        declarations:[UsersListComponent],
        imports: [  NoopAnimationsModule, 
                    RouterTestingModule,
                    RouterLink ],
        providers: [{ provide: UsersService, useValue: mockUsersService }, 
                    ErrorsService,
                    ChangeDetectorRef ],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents()
    }) 
  )

  beforeEach( () => {
    fixture = TestBed.createComponent(UsersListComponent)    
    changeDetector = TestBed.inject(ChangeDetectorRef)      
    component = fixture.componentInstance
    fixture.detectChanges()
    container = fixture.debugElement.query(By.css('.container'))
    article = fixture.debugElement.query(By.css('article'))
  })     

    
  it("should load the template", () => {
    expect(container).not.toBeNull()   
  })
  
  it("should have link to add user", () => {
    let link = fixture.debugElement.query(By.directive(RouterLink))
    expect(link.nativeElement.href).toContain("create")
  })
    
  it('should list users', fakeAsync(() => {   
    component.error = false
    component.users = getUsersSpy()
    // do a change detection on the real changeDetectionRef when use onPush strategy
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges()
    expect(article.childNodes.length).toBeGreaterThan(1)
  }))

  it("should show <app-error> if an error occurs", () => {
    component.error = true
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges()
    appError = fixture.debugElement.query(By.css('app-error'))
    expect(appError).toBeTruthy()
  })
  
})
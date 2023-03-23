import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { defer, noop, Observable, of } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { UsersService } from "src/app/core/services/users.services";
import { UsersListComponent } from "./users-list.component";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { UserComponent } from "../user/user.component";

// NoopAnimations pour enlever les anims
// https://stackoverflow.com/questions/63839249/unit-testing-angular-component-with-input

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
  let usersService: UsersService
  let article: DebugElement
  let appUser: DebugElement[]
  let component: Component
  
  beforeEach( 
    waitForAsync(() => { 
      TestBed.configureTestingModule({
        declarations:[UsersListComponent],
        imports: [  NoopAnimationsModule, HttpClientTestingModule ] ,
        providers: [UsersService, NoopAnimationsModule]
      }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UsersListComponent)
        usersService = TestBed.inject(UsersService)       
        spyOn(usersService, 'getUsers').and.returnValue(of(users))
        usersService.getUsers()
        article = fixture.debugElement.query(By.css('article'))
        appUser = fixture.debugElement.queryAll(By.css('appUser'))
      })     
      // article.childNodes.forEach((x)=>console.log("x: ",x.nativeNode))
    })
  )
    
  it("should load the template", () => {
    expect(article).not.toBeNull()   
  })
  
  // je souhaite retrouver tous les <app-user> de mon template
  // mais je n'y arrive pas. 
  // <app-user *ngFor="let x of users | async" [user]="x"></app-user>
  xit('should list users', () => {   
    fixture.detectChanges()
    expect(article.childNodes.length).toBeGreaterThan(1)
  })

  
})
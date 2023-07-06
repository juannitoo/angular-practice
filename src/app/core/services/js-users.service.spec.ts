import { TestBed } from '@angular/core/testing';
import { JsUsersService  } from './js-users.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';


describe('Js-Users Service', () => {

  let jsUsersService: JsUsersService

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

  let userUpdateForm = {
    name: "string",
    username: "string",
    email: "string",
    phone: "string",
    address : { 
      city : "string",
      geo: {lat: "string", lng: "string"},
      street: "string",
      suite: "string",
      zipcode: "string"
    },
    company : { 
      name : "string",
      catchPhrase: "string",
      bs: "string"
    },
    website: "string",
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers: [ JsUsersService, HttpClient, HttpHandler]
    })
    jsUsersService = TestBed.inject(JsUsersService)
  })
  
  it('should configure JsUsersServices and dependencies in testing module', () => { 
    expect(jsUsersService).toBeDefined();
  })

  it('should return a user when on getUser call', (done: DoneFn) => {
    spyOn(jsUsersService, 'getUser').and.returnValue(of(users[0]))
    jsUsersService.getUser(1).subscribe({
        next : response => {
          expect(response).toEqual(users[0])
          done()
        },
        error : done.fail
      })
  })

  it('should return an error when error occurs on getUser()', (done: DoneFn) => {
    jsUsersService.getUser(1).subscribe({
      next: response => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain("erreur service getUser()")
        done()
      }
    })
  })

  it('should return an array of users on getUsers() call', (done: DoneFn) => {
    spyOn(jsUsersService, 'getUsers').and.returnValue(of(users))
    jsUsersService.getUsers().subscribe(response => {
        expect(response).toEqual(users)
        done()
    })
  })

  it('should return an error when error occurs on getUsers()', (done: DoneFn) => {
    jsUsersService.getUsers().subscribe({
      next: response => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain("erreur service getUsers()")
        done()
      }
    })
  })

  it('should delete a user', () => {
    spyOn(jsUsersService, 'deleteUser')
    jsUsersService.deleteUser(1)
    expect(jsUsersService.deleteUser).toHaveBeenCalledOnceWith(jasmine.any(Number))
  })

  it('should return an error when error occurs on deleteUser()', (done: DoneFn) => {
    jsUsersService.deleteUser(1).subscribe({
      next: response => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain("erreur service deleteUser()")
        done()
      }
    })
  })

  it('should update a user', (done: DoneFn) => {
    spyOn(jsUsersService, 'updateUser').and.returnValue(of(users[0]))
    jsUsersService.updateUser(1, userUpdateForm).subscribe( (response) => {
      expect(response).toEqual(users[0])
      done()
    })
    expect(jsUsersService.updateUser).toHaveBeenCalledOnceWith(1, userUpdateForm)
  })

  it('should return an error when error occurs on updateUser()', (done: DoneFn) => {
    jsUsersService.updateUser(1, userUpdateForm).subscribe({
      next: response => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain("erreur service updateUser()")
        done()
      }
    })
  })

  it('should add a user', (done: DoneFn) => {
    let user$ = of(users[0])
    spyOn(jsUsersService, 'addUser').and.returnValue(user$)
    jsUsersService.addUser(userUpdateForm).subscribe( (response) => {
      expect(response).toEqual(users[0])
      done()
    })
    expect(jsUsersService.addUser).toHaveBeenCalledOnceWith(userUpdateForm)
  })

  it('should return an error when error occurs on addUser()', (done: DoneFn) => {
    jsUsersService.addUser(userUpdateForm).subscribe({
      next: response => done.fail('expected an error'),
      error: error  => {
        expect(error).toContain("erreur service addUser()")
        done()
      }
    })
  })

});


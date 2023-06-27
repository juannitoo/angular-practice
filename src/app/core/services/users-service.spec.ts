import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UsersService } from './users.services';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';


describe('UsersService', () => {

  let usersService: UsersService; 

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
    address : {city : "string"},
    company : {name : "string"},
    website: "string",
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers: [UsersService, HttpClient, HttpHandler]
    })
    usersService = TestBed.inject(UsersService); 
  })
  
  it('should configure usersServices and dependencies in testing module', () => { 
    expect(usersService).toBeDefined();
  })

  it('getUser() should return a user', () => {
    let response:User
    spyOn(usersService, 'getUser').and.returnValue(of(users[0]))
    usersService.getUser(1).subscribe(res => {
        response = res
    })
    expect(response!).toEqual(users[0])
  })

  it('getUsers() should return an array of users', () => {
    let response:User[]
    spyOn(usersService, 'getUsers').and.returnValue(of(users))
    usersService.getUsers()!.subscribe(res => {
        response = res
    })
    expect(response!).toEqual(users)
  })

  it('deleteUser() should delete a user', () => {
    spyOn(usersService, 'deleteUser')
    usersService.deleteUser(1)
    expect(usersService.deleteUser).toHaveBeenCalledOnceWith(jasmine.any(Number))
  })

  it('updateUser() should update a user', () => {
    let response: User
    spyOn(usersService, 'updateUser').and.returnValue(of(users[0]))
    usersService.updateUser(1, userUpdateForm).subscribe( (res) => {
      response = res
    })
    expect(usersService.updateUser).toHaveBeenCalledOnceWith(1, userUpdateForm)
    expect(response!).toEqual(users[0])
  })

});


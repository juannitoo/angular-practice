import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    // Si le back end faisait vraiment son taf, il me semble que ca fonctionnerait
    // faut que je me renseigne sur la gestion des erreurs

    constructor( private http : HttpClient,
                 private router : Router ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }

    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    }
    
    deleteUser(userId: number): Observable<User>{
        return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    }

    // addUser(formValue: User): Observable<User>{
    //     return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`,
    //     formValue);
    // }

    addUser(): Observable<User>{
        const formValue = {
            "id": 11,
            "name": "Jean Balangué",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
              "street": "Kulas Light",
              "suite": "Apt. 556",
              "city": "St Jean de Luz",
              "zipcode": "64500",
              "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
              }
            },
            "phone": "",
            "website": "hildegard.org",
            "company": {
              "name": "Romaguera-Crona",
              "catchPhrase": "Multi-layered client-server neural-net",
              "bs": "harness real-time e-markets"
            }
        }
        console.log(formValue)
        return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`,
        formValue);
    }

    updateUser(userId: number, formValue: User ){
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users`,
        formValue);
    }
    
}


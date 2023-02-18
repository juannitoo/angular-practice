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
        console.log('service delete')
        return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    }

    addUser(formValue: FormData ): Observable<User>{
        return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`,
        formValue)
    }

    updateUser(userId: number, formValue: string ): Observable<User>{
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${userId}`,
        formValue);
    }
    
}


// l'api retourne exatement ce qu'on lui envoie 
// qd on est sur la bonne route avec la bonne méthode
// const formValue = {
//     "name": "Jean Balangué",
//     "username": "Bret",
//     "adress": "String !"
// }
// fetch('https://jsonplaceholder.typicode.com/users', {
//     method: 'POST',
//     body: JSON.stringify( formValue ),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JsUsersService {

    constructor( private http : HttpClient,
                 private router : Router ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${userId}`);
    }
    
    deleteUser(userId: number): Observable<User>{
        console.log('service delete')
        return this.http.delete<User>(`http://localhost:3000/users/${userId}`);
    }

    addUser(formValue: FormData ): Observable<User>{
        return this.http.post<User>(`http://localhost:3000/users`,
        formValue)
    }

    updateUser(userId: number, formValue: string): Observable<User>{
        return this.http.put<User>(`http://localhost:3000/${userId}`,
        formValue);
    }
    
}


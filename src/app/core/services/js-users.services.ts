import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class JsUsersService {

    constructor( private http : HttpClient ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${userId}`);
    }
    
    deleteUser(userId: number): Observable<any>{
        return this.http.delete<User>(`http://localhost:3000/users/${userId}`,{
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    addUser(formValue: FormData ): Observable<User>{
        return this.http.post<User>(`http://localhost:3000/users`,
        formValue)
    }

    updateUser(userId: number, formValue: string): Observable<User>{
        return this.http.put<User>(`http://localhost:3000/users${userId}`,
        formValue);
    }
    
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
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
        return this.getUsers().pipe(
            map(users => [...users].sort((a,b) => a.id - b.id)),
            map(sortedUsers => sortedUsers[sortedUsers.length - 1]),
            map(previousUser => ({
                ...formValue,
                id: previousUser.id + 1
           })),
           switchMap(newUser => this.http.post<User>(
                'http://localhost:3000/users',
                newUser,{
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                })
           )
        )
    }

    updateUser(userId: number, formValue: FormData): Observable<User>{
        return this.getUser(userId).pipe(
            map( user => ({
                ...formValue,
                id: user.id 
                })),
            switchMap(updatedUser => this.http.put<User>(
                `http://localhost:3000/users/${userId}`,
                updatedUser,{
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                })
            )
        )
    }
    
}


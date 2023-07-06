import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, catchError, timer, retry } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserCreateValues } from '../interfaces/js-user-create-form.interface';

//json-server users

@Injectable()
export class JsUsersService {

    constructor( private http : HttpClient ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users').pipe(
            retry({
                count: 1,
                delay: () => {
                  console.log('service getUsers() Fail, retest...')
                  return timer(250)
                },
            }),
            catchError( err => { 
                throw `erreur service getUsers(): ${err.message}` 
            })
        )
    }

    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
            retry({
                count: 2,
                delay: () => {
                  console.log('service getUser() Fail, retest...')
                  return timer(500)
                },
            }),
            catchError( err => { throw `erreur service getUser(): ${err.message}` })
        )
    }
    
    deleteUser(userId: number): Observable<any>{
        return this.http.delete<User>(`http://localhost:3000/users/${userId}`,{
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).pipe(
            retry({
                count: 2,
                delay: () => {
                  console.log('service deleteUser() Fail, retest...')
                  return timer(500)
                },
            }),
            catchError( err => { throw `erreur service deleteUser(): ${err.message}` })
        )
    }

    addUser(formValue: UserCreateValues ): Observable<User>{
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
           ),
           retry({
            count: 2,
            delay: () => {
              console.log('service addUser() Fail, retest...');
              return timer(500);
            },
        }),
           catchError( err => { throw `erreur service addUser(): ${err.message}` })
        )
    }

    updateUser(userId: number, formValue: UserCreateValues): Observable<User>{
        return this.getUser(userId).pipe(
            map( () => ({
                ...formValue,
                id: userId 
                })
            ),
            switchMap(updatedUser => this.http.put<User>(
                `http://localhost:3000/users/${userId}`,
                updatedUser,{
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                })
            ),
            retry({
                count: 2,
                delay: () => {
                  console.log('service updateUsers() Fail, retest...')
                  return timer(500)
                },
            }),
            catchError( err => { throw `erreur service updateUser(): ${err.message}` })
        )
    }
    
}


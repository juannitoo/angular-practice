import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, switchMap, of, filter, catchError } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

    private users$! : any

    constructor( private http : HttpClient,
                 private router : Router ) { }

    getUsers(users$?:Observable<User[]>): Observable<User[]> {
        // if (this.users$) this.users$.subscribe((resp:any)=>console.log('users$ userService',resp))
        if (!this.users$) return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
        else return this.users$
    }

    getUser(userId: number): Observable<User> {
        // console.log('000')
        return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);

        // if (!this.users$) return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
        // else { 
        //     console.log('111')
        //     of(this.users$).pipe(
        //         // tap( (val) => console.log('eee',val) ),
        //         filter( (user:User) => user.id === userId ),
        //         // tap( (val) => console.log('fff',val) ),
        //         catchError(err => {
        //             throw 'erreur getUser(): ' + err;
        //         })
        //     ).subscribe({
        //         next: (val:any) => console.log('subscribe', val),
        //         error: (err:any) => console.log('subscribe err',err)
        //     })
        //     console.log('222', this.users$)
        //     return of(this.users$)
        // }

        ///  ------------------ autre tentative   
        // const utilisateur = this.users$.subscribe((users:User[])=>{
        //     console.log(users)
        //     const user = (users.filter((user:User) => user.id === userId))[0]
        //     console.log(user)
        //     let util = of(user)
        //     console.log(util)
        //     return util
        //     // et ca ne fonctionne pas ... object object avec | async ds template ... 
        //     // type subscription en fait
        // })
        // return utilisateur
        
    }
    
    deleteUser(userId: number): Observable<User[]>{
        return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${userId}`).pipe(
            switchMap( () => { 
                        return this.getUsers().pipe(
                        map( utilisateurs => [...utilisateurs]),
                        map( (utilisateurs) => { 
                            const index = utilisateurs.findIndex((u)=> u.id === userId);
                            utilisateurs.splice(index,1);
                            this.users$ = of(utilisateurs)
                            return this.users$
                        })
                    )
                }
            ),
        );
    }

    // addUser(formValue: FormData ): Observable<User>{
    //     return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`,
    //     formValue)
    // }

    addUser(formValue: FormData ): any{
        return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`,formValue).pipe(
            switchMap( (user) => { 
                console.log('user ',user)
                return this.getUsers().pipe(
                    map( utilisateurs => ([...utilisateurs, user])),
                    map( (utilisateurs) => {
                        this.users$ = of(utilisateurs)
                        return this.users$
                    })                   
                )
            }),
        )
    }

    updateUser(userId: number, formValue: string ): Observable<User>{
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${userId}`,
        formValue);
    }
    
}

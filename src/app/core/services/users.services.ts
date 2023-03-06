import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, switchMap, of, filter, catchError, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

    private _users$ = new BehaviorSubject<User[]>([])
    get users$(): Observable<User[]> {
        return this._users$.asObservable()
    }

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
      return this._loading$.asObservable();
    }

    constructor( private http : HttpClient,
                 private router : Router ) { }

    getUsers(){
        if (this._users$.value.length === 0 ) {
            this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
                tap(users=>{
                    this._users$.next(users)
                    console.log("userrService getUsers() via http get")
                })
            ).subscribe()
        } else {
            console.log("userrService getUsers() sans http get, vive le BehaviorSubject !")
        }
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
        
    }
    
    deleteUser(userId: number){  //: Observable<User[]>
        // return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${userId}`).pipe(
        //     switchMap( () => { 
        //                 return this.getUsers().pipe(
        //                 map( utilisateurs => [...utilisateurs]),
        //                 map( (utilisateurs) => { 
        //                     const index = utilisateurs.findIndex((u)=> u.id === userId);
        //                     utilisateurs.splice(index,1);
        //                     this.users$ = of(utilisateurs)
        //                     return this.users$
        //                 })
        //             )
        //         }
        //     ),
        // );
    }


    addUser(formValue: FormData ){
        this.users$.pipe( 
            map( users => {
                const sortedUsers = users.sort((a,b)=> a.id - b.id)
                const lastId = sortedUsers[sortedUsers.length-1].id
                const user = {
                    ...formValue,
                    "id": lastId+1                     
                }
                return of(users.push(user))
            }),
            map( () => this.router.navigateByUrl('jsonplaceholder/users')),
        ).subscribe()

    }



    updateUser(userId: number, formValue: string ): Observable<User>{
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${userId}`,
        formValue);
    }
    
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of, catchError, BehaviorSubject } from 'rxjs';
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
                }),
                catchError(err => { throw 'erreur getUsers(): ' + err })
            ).subscribe()
        } else {
            console.log("userrService getUsers() sans http get, vive le BehaviorSubject !")
        }
    }

    
    getUser(userId: Number): Observable<User>{
        if (this._users$.value.length === 0 ) return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
        else { 
            return this.users$.pipe(
                map( users => users.filter(user => user.id === userId )[0]),
                catchError(err => {
                    throw 'erreur getUser(): ' + err;
                })
            )          
        }       
    }
    
    deleteUser(userId: number){  
        this.users$.pipe(
            map( (users) => { 
                const index = users.findIndex((u)=> u.id === userId);
                users.splice(index,1);
                return of(users)
            }),
            catchError(err => { throw 'erreur deleteUser(): ' + err })
        ).subscribe()   
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
            catchError(err => { throw 'erreur addUser(): ' + err })
        ).subscribe()
    }


    updateUser(userId: Number, formValue: any){
        this.getUser(userId).pipe(
            map( user => {
                user.name = formValue.name
                user.username = formValue.username
                user.email = formValue.email
                if (user.address?.city) 
                    user.address.city = formValue.address.city
                else
                    // Ah il a pas, il m'embête, je vais lui expliquer
                    Object.defineProperty(user, 'address',{
                        value : {
                            "city" : formValue.address.city
                        }
                    })                  
                user.phone = formValue.phone
                user.website = formValue.website
                if (user.company?.name) 
                    user.company.name = formValue.company.name
                else
                    Object.defineProperty(user, 'company',{
                        value : {
                            "name" : formValue.address.city
                        }
                    }) 
                return of(user)
            }),
            map( () => this.router.navigateByUrl('jsonplaceholder/users')),
            catchError(err => { throw 'erreur updateUser(): ' + err })
        ).subscribe()
        
    }
    





}

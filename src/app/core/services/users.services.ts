import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, of, catchError, BehaviorSubject, retry, Subject, delay } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { UserUpdateForm } from '../interfaces/user-update-form.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

    private _users$ = new BehaviorSubject<User[]>([])
    get users$(): Observable<User[]> {
        return this._users$.asObservable()
    }

    constructor( private http : HttpClient,
                 private router : Router ) { }

    getData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/users/data`,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        ).pipe(
            map(response => response.data),
            catchError( err => { 
                throw `erreur service getdata(): ${err.message}` 
            })
        )
    }

    getUsers(): Observable<User[]>{
        if (this._users$.value.length === 0 ) {
            this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
                tap(users=>{
                    this._users$.next(users)
                    console.log("usersService getUsers() via http get")
                }),
                retry(2),
                catchError((err: HttpErrorResponse) => { 
                    throw 'erreur getUsers(): ' + err.message 
                })
            ).subscribe()
            return this.users$ // ca ne sert que pour le test !
        } else {
            console.log("usersService getUsers() sans http get, vive le BehaviorSubject !")
            return this.users$ // et normalement ca ne retourne rien
        }
    }
 
    getUser(userId: Number): Observable<User>{
        if (this._users$.value.length === 0 ) return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
        else { 
            return this.users$.pipe(
                map( users => users.filter(user => user.id === userId )[0]),
                catchError((err: HttpErrorResponse) => {
                    throw 'erreur getUser(): ' + err.message
                })
            )          
        }       
    }
    
    deleteUser(userId: number): void{  
        this.users$.pipe(
            map( (users) => { 
                const index = users.findIndex((u)=> u.id === userId);
                users.splice(index,1);
                return of(users)
            }),
            catchError((err: HttpErrorResponse) => { throw 'erreur deleteUser(): ' + err.message })
        ).subscribe(()=> {return true})        
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
            catchError((err: HttpErrorResponse) => { throw 'erreur addUser(): ' + err.message })
        ).subscribe()
    }

    updateUser(userId: Number, formValue: UserUpdateForm){ 
        this.getUser(userId).pipe(
            map( user => {
                user.name = formValue.name
                user.username = formValue.username
                user.email = formValue.email
                if (user.address?.city !== undefined) 
                    user.address.city = formValue.address.city
                else
                    Object.defineProperty(user, 'address',{
                        value : {
                            "city" : formValue.address.city
                        }
                    })                  
                user.phone = formValue.phone
                user.website = formValue.website
                if (user.company?.name !== undefined) 
                    user.company.name = formValue.company.name
                else
                    Object.defineProperty(user, 'company',{
                        value : {
                            "name" : formValue.company.name
                        }
                    }) 
                return of(user)
            }),
            map( () => this.router.navigateByUrl('jsonplaceholder/users')),
            catchError((err: HttpErrorResponse) => { throw 'erreur updateUser(): ' + err.message })
        ).subscribe()
        // normalement ne retourne rien
        // juste pour les tests
        return this.getUser(userId)
    }
    





}

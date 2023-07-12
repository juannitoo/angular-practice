import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token! : string;

  constructor( private http: HttpClient ) {  }

  getToken(): string | null {
    console.log(this.token)
    return this.token === undefined ? localStorage.getItem('token') : this.token 

  }

  saveToken(token:string): void {
    localStorage.setItem('token', token)
  }

  signUp(data: Data): any {
    console.log('signUpUser service')
    return this.http.post<any>('http://localhost:3001/api/users/signup', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      ).pipe(
        tap(response =>{console.log(`message retour ${response}`)}),
    )
  }

  login(data: Data): Observable<any> {
    console.log('login service')
    return this.http.post<any>('http://localhost:3001/api/users/login', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    ).pipe(
      tap((response) =>{ console.log(`message retour ${response.message}`) }),
      tap((response) => { this.token = response.token }),
      // tap((response) => { console.log(`message his.token ${this.token}`)}),
      tap(() => { this.saveToken( this.token )}),
    )
  }

  logout(){
    localStorage.removeItem('token')
  }

}
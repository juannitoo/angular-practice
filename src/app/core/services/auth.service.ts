import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token! : string | null

  constructor( private http: HttpClient ) {  }

  getToken(): string | null {
    return this.token ? localStorage.getItem('token') : this.token 
  }

  saveToken(token:string): void {
    localStorage.setItem('token', token)
  }

  signUp(data: Data): Observable<any> {
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
    return this.http.post<any>('http://localhost:3001/api/users/login', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    ).pipe(
      tap((response) => { 
        if (response.status === 200 ) {
          this.token = response.token
          this.saveToken( response.token ) // this.token marche pas pbme de type string n'est pas null
        }
      }),

    )
  }

  logout(){
    localStorage.removeItem('token')
    this.token = null
  }

}
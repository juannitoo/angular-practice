import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token! : string;

  constructor( private http: HttpClient ) {  }

  getToken(): string {
    return this.token;
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

  login(data: Data): any {
    console.log('login service')
    return this.http.post<any>('http://localhost:3001/api/users/login', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    ).pipe(
      tap(response =>{ console.log(`message retour ${response.message}`) }),
      map(response=> { this.token = response.token })
    )

  }
}
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // export async function reTryCatch(callback, times = 1) {
  //   try {
  //     return await callback()
  //   } catch (error) {
  //     if (times > 0) {
  //       return await reTryCatch(callback, times - 1)
  //     } else {
  //       throw error
  //     }
  //   }
  // }

  private token! :  string | undefined | null 

  constructor( private http: HttpClient ) {  }

  getToken(): string | undefined | null {
    return this.token === undefined ? localStorage.getItem('token') : this.token 
  }

  saveToken(token:string | undefined | null): void {
    if ( typeof token === "string") localStorage.setItem('token', token)
  }

  deleteToken(): void {
    localStorage.removeItem('token')
    this.token = undefined
  }

  signUp(data: Data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/signup`, 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    "Accept" : "*/*" })}
      ).pipe(
        tap((response) => { 
          if (response.status === 200 ) {
            this.token = response.token
            this.saveToken( this.token )
          }
        }),
      )
  }

  login(data: Data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/login`, 
      { "email": data['email'], 
        "password": data["password"],
      },
      { headers: new HttpHeaders(
        { 'Content-Type': 'application/json; charset=utf-8',
          "Accept" : "*/*"
        }
      )}
    ).pipe(
      tap((response) => { 
        if (response.status === 200 ) {
          this.token = response.token
          this.saveToken( this.token )
        }
      }),

    )
  }

  logout(){
    localStorage.removeItem('token')
    this.token = undefined
  }

}
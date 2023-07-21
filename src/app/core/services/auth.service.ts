import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import jwt_decode, { JwtDecodeOptions, JwtHeader, JwtPayload } from "jwt-decode"


interface jwtTokenPayloadInterface{
  exp : number,
  iat : number,
  userId : string,
}


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
  // private userId : string | undefined  // ??? cette version de l'algo n'a pas l'air robuste, setté ds login()

  constructor( private http: HttpClient ) {  }

  getToken(): string | undefined | null {
    return this.token === undefined ? localStorage.getItem('token') : this.token 
  }

  saveToken(token:string | undefined | null): void {
    if (typeof token === "string") localStorage.setItem('token', token)
  }

  deleteToken(): void {
    localStorage.removeItem('token')
    this.token = undefined
  }

  getUserId(): string | null { 
    // return this.userId === undefined ? localStorage.getItem('userId') : this.userId
    const token = this.getToken()
    let decoded : null | jwtTokenPayloadInterface = null  
    // JwtDecodeOptions | JwtPayload | JSON | JwtHeader | Object, pas de userId ici donc interface
    if (typeof token === "string") decoded = jwt_decode(token)
    return decoded ? decoded.userId : null
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
          // this.userId = response.userId
          // localStorage.setItem('userId', response.userId )
          this.saveToken( this.token )
        }
      }),

    )
  }

  logout() : null{
    localStorage.removeItem('token')
    this.token = undefined
    // this.userId = undefined
    return null
  }

  checkIfEmailUsed(data: string): any {
    // return this.http.post<string>(`${environment.apiUrl}/api/users/ismailused`, 
    //   { "email": data, 
    //   },
    //   { headers: new HttpHeaders({ 'Content-Type': 'application/json',
    //                                 "Accept" : "*/*" })}
    //   ).pipe(        
    // )
    return true
  }

}
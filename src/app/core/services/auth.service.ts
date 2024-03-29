import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders,  } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
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


  private _isLogged$ = new BehaviorSubject<boolean>(false)
  get isLogged$(): Observable<boolean> {
      return this._isLogged$.asObservable()
  }


  constructor( private http: HttpClient ) { 
    // lors du rafraichissement
    if(localStorage.getItem('token')) this._isLogged$.next(true)
   }

  getToken(): string | undefined | null {
    return this.token === undefined ? localStorage.getItem('token') : this.token 
  }

  saveToken(token:string | undefined | null): void {
    if (typeof token === "string") localStorage.setItem('token', token)
  }

  deleteToken(): void {
    localStorage.removeItem('token')
    this._isLogged$.next(false)
    this.token = undefined
  }

  getUserId(): string | null { 
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
            this._isLogged$.next(true)
          }
        }),
        catchError((err: HttpErrorResponse) => { 
          throw 'erreur sign up(): ' + err.message 
        })
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
          this._isLogged$.next(true)
        }
      }),
      catchError((err: HttpErrorResponse) => { 
        throw 'erreur login(): ' + err.message 
      })
    )
  }

  logout() : null{
    localStorage.removeItem('token')
    this.token = undefined
    this._isLogged$.next(false)
    return null
  }

  checkIfEmailIsUsed(data: string): any {
    if (data.length > 5) {
      return this.http.post<string>(`${environment.apiUrl}/api/users/isemailused`, 
        { "email": data },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Accept" : "*/*" })}
      )
    } else {
      let resp
      return of({resp :  false})
    }
  }

}
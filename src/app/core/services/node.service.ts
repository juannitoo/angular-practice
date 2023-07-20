import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry, tap, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";
import { NodeUser } from '../interfaces/node-user.interface';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor( private http: HttpClient,
                private authService : AuthService ) {  }

  getUsers(): Observable<NodeUser[]> {
    return this.http.get<NodeUser[]>(`${environment.apiUrl}/api/users`).pipe(
        retry({
            count: 1,
            delay: () => {
              console.log('service node getUsers() Fail, retest...')
              return timer(250)
            },
        }),
        catchError( err => { 
            throw `erreur service node getUsers(): ${err.message}` 
        })
    )
  }

  deleteAccount(){
    let userId: string = ""
    const token = this.authService.getToken()
    if (typeof(token) === "string" ) {
      userId = jwt_decode<any>(token).userId 
    }
    return this.http.delete<NodeUser>(`${environment.apiUrl}/api/users/${userId}`, 
        { headers: new HttpHeaders(
          { 'Content-Type': 'application/json; charset=utf-8',
            "Accept" : "*/*"
          })}
      ).pipe(
        tap(() =>{this.authService.deleteToken()}),
        catchError( err => { 
          throw `erreur service node deleteUser(): ${err.message}` 
        })
      )
  }

}

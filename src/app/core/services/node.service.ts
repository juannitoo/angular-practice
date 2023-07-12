import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor( private http: HttpClient ) {  }

  getDate(): Observable<any> {
    return this.http.get<any>('http://localhost:3001').pipe(
      map(date => date.date),
      tap(date =>{console.log(`date ${date}`)}),
      catchError( err => { 
          throw `erreur service getUsers(): ${err.message}` 
      })
    )
  }

  sendData(): any {
    console.log('send data service')
    return this.http.post<any>('http://localhost:3001', 
      { "data" : "111111"},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      ).pipe(
      tap(message =>{console.log(`message retour ${message.message}`)}),
    ).subscribe()
  }

  signUpUser(data: Data): any {
    console.log('signUpUser service')
    return this.http.post<any>('http://localhost:3001/api/users/signup', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      ).pipe(
      tap(message =>{console.log(`message retour ${message.message}`)}),
    ).subscribe()
  }

  loginUser(data: Data): any {
    console.log('signUpUser service')
    return this.http.post<any>('http://localhost:3001/api/users/login', 
      { "email": data['email'], 
        "password": data["password"]
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      ).pipe(
      tap(message =>{console.log(`message retour ${message.message}`)}),
    ).subscribe({
      next: (params) => console.log(params),
      error: (err) => console.log(err)
    })
  }
}

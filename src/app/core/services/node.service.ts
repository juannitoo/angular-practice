import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

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
}

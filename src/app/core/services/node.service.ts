import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor( private http: HttpClient ) {  }

  getDate(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}`).pipe(
      map(date => date.date),
      tap(date =>{console.log(`date ${date}`)}),
      catchError( err => { 
          throw `erreur service getUsers(): ${err.message}` 
      })
    )
  }

  sendData(): any {
    console.log('send data service')
    return this.http.post<any>(`${environment.apiUrl}`, 
      { "data" : "111111"},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      ).pipe(
      tap(message =>{console.log(`message retour ${message.message}`)}),
    ).subscribe()
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor( private http: HttpClient ) {  }

  getDate(): Observable<any> {
    return this.http.get<any>('http://localhost:8000').pipe(
      map(date => date.date),
      tap(date =>{console.log(`date ${date}`)}),
        // retry({
        //     count: 1,
        //     delay: () => {
        //       console.log('service getUsers() Fail, retest...')
        //       return timer(250)
        //     },
        // }),
      catchError( err => { 
          throw `erreur service getUsers(): ${err.message}` 
      })
    )
}
}

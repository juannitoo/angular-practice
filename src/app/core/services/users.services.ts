import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor( private http : HttpClient ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      }
    
    
}
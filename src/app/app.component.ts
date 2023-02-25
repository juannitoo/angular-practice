import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, interval, Observable, Subject, take } from 'rxjs';
import { timeout } from 'rxjs';
import { ReplaySubject } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-tuto-perso';

  ngOnInit(){

    
  }

}

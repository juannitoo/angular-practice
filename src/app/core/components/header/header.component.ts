import { query, stagger, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger( 'slideTextContainer', [
      transition(':enter', [
        query("span", [
          stagger(250, [
            useAnimation(SlideAndFadeAnimation, {
              params: {
                  timer: '200ms',
                  direction: 'X',
                  directionValue: '-100%'
              }}
            )]
          )]
        )
      ])
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      const list = document.getElementsByClassName('logo-letter')
      for (let i=0; i<list.length ; i++ ){
        list.item(i)?.setAttribute('style', 'opacity:1;')
      }
    }, 1800)
  }

}

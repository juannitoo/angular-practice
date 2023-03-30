import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SlideAndFadeAnimation } from '../shared/animations/slide-and-fade.animation';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger( 'slideBox', [
      transition('void => *', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              delay: '0ms',
              direction: 'Y',
              directionValue: '-200%'
          }
        })
      ]),
    ]),
    trigger( 'slideBox2', [
      transition('void => *', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              delay: '0ms',
              direction: 'Y',
              directionValue: '200%'
          }
        })
      ]),
    ]),
  ]
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

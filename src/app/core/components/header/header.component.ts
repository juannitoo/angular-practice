import { animate, animateChild, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FadeInColorAnimation } from 'src/app/shared/animations/fade-in-color.animation';
import { SlideAndFadeAnimation } from 'src/app/shared/animations/slide-and-fade.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger( 'slideTextContainer', [
      transition(':enter', [
        query("span", [
          stagger(150, [
            animateChild()
          ],
          )]
        )
      ])
    ]),
    trigger( 'slideLetter', [
      transition(':enter', [
        useAnimation(FadeInColorAnimation, {
          params: {
              timer: '800ms',
              delay: '1200ms',
              startColor: 'red',
              endColor: 'rgb(141, 141, 141)'
          }}
        )
      ])
    ]),
    trigger( 'slideLogo', [
      transition(':enter', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              delay: '0ms',
              direction: 'X',
              directionValue: '-200%'
          }}
        )
      ])
    ]),
    trigger( 'slideNav', [
      transition(':enter', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              delay: '0ms',
              direction: 'X',
              directionValue: '100%'
          }}
        )
      ])
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  slideLetterState: 'hidden' | 'show' = 'hidden'

  constructor() { }

  ngOnInit(): void {
  }

}

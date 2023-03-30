import { animate, animateChild, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
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
          stagger(150, [
            animateChild()
          ],
          )]
        )
      ])
    ]),
    trigger( 'slideLetter', [
      transition(':enter', [
        useAnimation(SlideAndFadeAnimation, {
          params: {
              timer: '700ms',
              delay: '750ms',
              direction: 'X',
              directionValue: '-100%'
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
              directionValue: '-100%'
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

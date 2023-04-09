import { animateChild, query, stagger, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FadeInColorAnimation } from 'src/app/shared/animations/fade-in-color.animation';

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
              timer: '600ms',
              delay: '1200ms',
              startColor: 'red',
              endColor: 'rgb(141, 141, 141)'
          }}
        )
      ])
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  // il faut mettre le state pour que l'anim fonctionne !
  slideLetterState: 'hidden' | 'show' = 'hidden'

  constructor() { }

  ngOnInit(): void {
    this.toggleNavOnResize()
  }

  toggleMenu(){
    let nav = document.getElementsByTagName('nav')[0]
    if (nav.style.display  === "none" || nav.style.display == "") {
      nav.style.display = "block"
    } else {
      nav.style.display = "none"
    }
  }

  hideNav(){
    if (document.getElementsByTagName('html')[0].clientWidth <= 480) {
      document.getElementsByTagName('nav')[0].style.display = "none"
    } 
  }

  toggleNavOnResize(){
    window.addEventListener('resize', () => {
      if (document.getElementsByTagName('html')[0].clientWidth >= 480) {
        document.getElementsByTagName('nav')[0].style.display = "block"
      } else {
        document.getElementsByTagName('nav')[0].style.display = "none"
      }
    })
  }
}

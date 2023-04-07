import { animate, animation, style } from '@angular/animations';

export const FadeInColorAnimation = animation([
    style({
        opacity: 0,
        color: "{{startColor}}",
        'font-size': "2.3rem",
        'position' : "relative",
        'top': "-70px",
        'left': '0px'
    }),
    animate('{{timer}} {{delay}} ease-out', style({
        opacity: 1,
        color: "{{endColor}}",
        'font-size': "1.6rem",
        'position' : "relative",
        'top': "0px",
        'left': '0px'
    }))
])

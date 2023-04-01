import { animate, animation, style } from '@angular/animations';

export const FadeInColorAnimation = animation([
    style({
        opacity: 0,
        color: "{{startColor}}",
        'font-size': "2.5rem",
    }),
    animate('{{timer}} {{delay}} ease-out', style({
        opacity: 1,
        color: "{{endColor}}",
        'font-size': "1.6rem",
    }))
])

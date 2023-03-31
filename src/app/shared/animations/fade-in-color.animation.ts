import { animate, animation, style } from '@angular/animations';

export const FadeInColorAnimation = animation([
    style({
        opacity: 0,
        color: "{{startColor}}"
    }),
    animate('{{timer}} {{delay}} ease-out', style({
        opacity: 1,
        color: "{{endColor}}"
    }))
])

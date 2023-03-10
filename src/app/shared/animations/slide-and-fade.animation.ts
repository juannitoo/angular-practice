import { animate, animation, transition, style } from '@angular/animations';

export const SlideAndFadeAnimation = animation([
    style({
        transform: 'translateX(-100%)',
        opacity: 0,
    }),
    animate('500ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1,
    }))
])

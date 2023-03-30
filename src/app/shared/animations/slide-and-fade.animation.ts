import { animate, animation, style } from '@angular/animations';

export const SlideAndFadeAnimation = animation([
    style({
        transform: 'translate{{direction}}({{directionValue}})', //-100%
        opacity: 0,
    }),
    animate('{{timer}} {{delay}} ease-out', style({
        transform: 'translate{{direction}}(0)',
        opacity: 1,
    }))
])

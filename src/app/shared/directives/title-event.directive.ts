import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[titleEvent]'
})
export class TitleEventDirective implements AfterViewInit {
  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.titleEvent();
  }

  titleEvent() {
    let active = false
    let title = this.renderer.createElement("p")
    title.innerHTML = 'Salut, Je suis la directive custom titleEvent positionné sur le titre : <b>'+this.el.nativeElement.textContent
    title.innerHTML += '</b><br />Vous pouvez me trouver dans <b>app/shared/directives/title-event.directive.ts</b>'
    this.el.nativeElement.addEventListener('click', () =>{
        if (!active) {
            this.renderer.insertBefore(
                this.el.nativeElement.parentNode, 
                title, 
                this.el.nativeElement,
                false
            )
            active = true
        } else {
            this.renderer.removeChild(
                this.el.nativeElement.parentNode, 
                title, 
                true
            )
            active = false
        }
    })
    this.renderer.setStyle(title, 'margin', "0 auto");
    this.renderer.setStyle(title, 'text-align', "center");
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }
}
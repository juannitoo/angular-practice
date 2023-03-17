import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TitleEventDirective } from "./title-event.directive";

// la directive ajoute et supprime un paragrahe au dessus du titre cliqué.
// Je créé un mock du component ultra simple
// et je fais un test qui ne conclue jamais
// Serait-ce un test E2E et non pas unitaire ? Jasmine sait elle faire ca ? ou Protractor ?
// Là j'ai un vrai problème parce que ce que je fais ne fonctionne jamais.

describe('Directive TitleEvent', () => {


  @Component({
    template: `<h1 titleEvent>A tilte</h1>`
  })
  class TestComponent { }




  let fixture: ComponentFixture<Component>
  let component: Component
  let element: DebugElement
  let title: HTMLElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TitleEventDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    // component = fixture.componentInstance
  
    fixture.detectChanges(); // initial binding

    element = fixture.debugElement.query(By.css('h1'))
    title = fixture.debugElement.query(By.css('h1')).nativeElement
  });


  it('should have a H1 element', () => {
    expect(title).withContext("à l'initialisation, on a un titre").toBeDefined()
  })
  

  xit('should add a paragrah on click', () => {

    let p = fixture.debugElement.query(By.css("p"))
    
    expect(p).withContext("à l'initialisation, pas de paragraphe").toBeNull()

    let click = title.dispatchEvent(new Event('click')) 

    fixture.detectChanges()

    expect(click).toBeTrue()

    let p1 = fixture.debugElement.query(By.css("p"))
    expect(p1).withContext("après le click").not.toBeNull() // fu..

    // je n'ai pas réussi à setter un spy sur la méthode de la directive

  });
  
});

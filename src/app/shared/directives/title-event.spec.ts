import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TitleEventDirective } from "./title-event.directive";

// la directive ajoute et supprime un paragrahe au dessus du titre cliqué.
// Je créé un mock du component ultra simple
// et je fais un test qui vérifie la création d'un paragraphe accroché au parentNode du H1,
// comme le fait la directive

describe('Directive TitleEvent', () => {

  @Component({
    template: `<div><h1 titleEvent>A title</h1></div>`
  })
  class TestComponent { }

  let fixture: ComponentFixture<Component>
  let element: DebugElement
  let title: HTMLElement
  let div: HTMLElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TitleEventDirective, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges(); // initial binding

    element = fixture.debugElement.query(By.css('h1'))
    title = fixture.debugElement.query(By.css('h1')).nativeElement
    div = fixture.debugElement.query(By.css('div')).nativeElement
  });


  it('should have a title element', () => {
    expect(title).withContext("à l'initialisation, on a un titre").toBeDefined()
  })
  
  it('title element should have a parentNode element', () => {
    expect(div).withContext("à l'initialisation, on a un titre avec un parentnode").toBeDefined()
  })

  it('should add a paragrah on click', () => {
    let p = fixture.debugElement.query(By.css("p"))
    expect(p).withContext("à l'initialisation, pas de paragraphe").toBeNull()

    let click = title.dispatchEvent(new Event('click')) 
    expect(click).withContext("click").toBeTrue()

    fixture.detectChanges()

    let lastPdoesntWorkSoNewP = fixture.debugElement.query(By.css("p"))
    expect(lastPdoesntWorkSoNewP).withContext("après le click").not.toBeNull()
  });


  
});

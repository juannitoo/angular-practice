import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { JsonLandingComponent } from './json-landing.component'
import { DebugElement } from '@angular/core'
import { RouterLink } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'


xdescribe('Json-Server landingPageComponent', () => {
  let component: JsonLandingComponent
  let fixture : ComponentFixture<JsonLandingComponent>
  let title: HTMLElement
  let button: DebugElement 

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonLandingComponent ],
      imports: [ RouterTestingModule ]
    }).compileComponents()
  }))

  beforeEach( () => {
    fixture = TestBed.createComponent(JsonLandingComponent)    
    component = fixture.componentInstance
    title = fixture.debugElement.query(By.css('h1')).nativeElement
    button = fixture.debugElement.query(By.css('button'))
    fixture.detectChanges()
  })

  it('should create component JsonServerLandingComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should return h1', () => {
    expect(title.textContent).toBe("JsonPlaceHolder")
  })

  it('should have button to access demo', () => {
    expect(button.nativeElement.textContent).toBe("Accéder à la démo des Users")
  })

  it('should have link to Users page with routerlink directive', () => {
    let backLink = fixture.debugElement.query(By.directive(RouterLink))
    expect(backLink).toBeTruthy()
    expect(backLink.nativeElement.attributes[3].textContent).toBe("users")
  })

})
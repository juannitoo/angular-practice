import { TestBed, ComponentFixture } from '@angular/core/testing'
import { JsonServerLandingComponent } from './json-server-landing.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('landing-page Component', () => {
  let component: JsonServerLandingComponent
  let fixture : ComponentFixture<JsonServerLandingComponent>
  let title: HTMLElement
  let button: HTMLElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ JsonServerLandingComponent ],
      imports: [  NoopAnimationsModule ] ,
    })
    .createComponent(JsonServerLandingComponent)
  
    fixture.detectChanges()

    component = fixture.componentInstance
    title = fixture.debugElement.query(By.css('h1')).nativeElement
    button = fixture.debugElement.query(By.css('button')).nativeElement
  })

  it('should create component JsonServerLandingComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should return h1 Json-server', () => {
    expect(title.textContent).toBe("Json-server")
  })

  it('should have button to access demo', () => {
    expect(button.textContent).toBe("Accéder à la démo des Users")
  })

})
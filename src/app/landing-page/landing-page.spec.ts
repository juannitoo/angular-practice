import { TestBed, ComponentFixture } from '@angular/core/testing'
import { LandingPageComponent } from './landing-page.component'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('landing-page Component', () => {
  let component: LandingPageComponent
  let fixture : ComponentFixture<LandingPageComponent>
  let title: HTMLElement

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [  NoopAnimationsModule ] ,
    })
    .createComponent(LandingPageComponent)
  
    fixture.detectChanges()

    component = fixture.componentInstance
    title = fixture.debugElement.query(By.css('h1')).nativeElement
  })


  it('should create component', () => {
    expect(component).toBeTruthy()
  })

  it('should return h1', () => {
    expect(title.textContent).toBe("Mon initiation avec Angular")
  })
})
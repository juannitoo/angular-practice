import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing"
import { AppModule } from "./app.module"
import { AppComponent } from "./app.component"
import { BrowserModule } from "@angular/platform-browser"

import { RouterTestingModule } from "@angular/router/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { SharedModule } from "./shared/shared.module"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { CoreModule } from "./core/core.module"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module"


describe('Json-Place-Holder Module', () => {
  let fixture : ComponentFixture<AppModule>
  let component: AppComponent

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        NoopAnimationsModule,
        ReactiveFormsModule, 
        RouterTestingModule, 
        HttpClientTestingModule,
        AppRoutingModule
      ],
    })
  }))
  
  it('should start !', () => {
    fixture = TestBed.createComponent(AppComponent)
    expect(fixture.componentRef.location.nativeElement).toBeTruthy()
  })
})
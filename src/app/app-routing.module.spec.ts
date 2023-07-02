import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppRoutingModule, routes as testRoutes } from './app-routing.module'
import { Router } from '@angular/router'


describe('app routing Module', () => {
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(testRoutes),
                AppRoutingModule],
    })
    router = TestBed.inject(Router)
    router.initialNavigation()
  })

  it('should initialize the module', () => {
    const module = TestBed.inject(AppRoutingModule)
    expect(module).toBeTruthy()
  })

  it('should have 5 routes', () => {
    expect(testRoutes.length).toEqual(5)
  })
  
})
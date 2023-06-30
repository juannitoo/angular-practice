import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { JsonPlaceHoldeRoutingModule, routes as testRoutes } from './json-place-holder-routing.module'
import { RouterTestingModule } from '@angular/router/testing'
import { Route, Router } from '@angular/router'
import { Location } from '@angular/common'
import { JsonLandingComponent } from './components/json-landing/json-landing.component'
import { UserUpdateComponent } from './components/user-update/user-update.component'
import { UserCreateComponent } from './components/user-create/user-create.component'
import { UsersListComponent } from './components/users-list/users-list.component'
import { UserComponent } from './components/user/user.component'


describe('Json-Server Routing-Module', () => {
  let fixture: ComponentFixture<JsonLandingComponent>
  let router: Router
  let location: Location

  // ne pas oublier d'exporter les routes depuis JPH routing mudule
  function initRoutes (component : typeof UserUpdateComponent | 
                                  typeof UserCreateComponent | 
                                  typeof UserComponent | 
                                  typeof UsersListComponent | 
                                  typeof JsonLandingComponent ) 
                                  : void {
    let route : Route = testRoutes.filter( x => x.component === component )[0]
    router.navigate([route.path])
    tick()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,
                      UserCreateComponent,
                      UserUpdateComponent,
                      UsersListComponent,
                      JsonLandingComponent
                     ],
      imports: [RouterTestingModule.withRoutes(testRoutes)],
      providers : [ JsonPlaceHoldeRoutingModule ]
    })
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    fixture = TestBed.createComponent(JsonLandingComponent)
    router.initialNavigation()
  })

  it('should initialize the module', () => {
    const module = TestBed.inject(JsonPlaceHoldeRoutingModule)
    expect(module).toBeTruthy()
  })

  it('should have 5 routes', () => {
    const routes = testRoutes
    expect(routes.length).toEqual(5)
  })

  it('should use JsonLandingComponent with "/" path', fakeAsync(() => {
    initRoutes(JsonLandingComponent)
    expect(location.path()).toBe('/')
  }))

  it('should use UsersListComponent with "/users" path', fakeAsync(() => {
    initRoutes(UsersListComponent)
    expect(location.path()).toBe('/users')
  }))

  it('should use UserDetailsComponent with "/users/1" path', fakeAsync(() => {
    initRoutes(UserComponent)
    expect(location.path()).toBe('/users/:id')
  }))

  it('should use UserCreateComponent with "/users/create" path', fakeAsync(() => {
    initRoutes(UserCreateComponent)
    expect(location.path()).toBe('/users/create')
  }))

  it('should use UserUpdateComponent with "/users/update/1" path', fakeAsync(() => {
    initRoutes(UserUpdateComponent)
    expect(location.path()).toBe('/users/update/:id')
  }))
  
})
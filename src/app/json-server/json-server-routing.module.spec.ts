import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { JsonServerRoutingModule } from './json-server-routing.module'
import { routes as testRoutes } from './json-server-routing.module'
import { RouterTestingModule } from '@angular/router/testing'
import { Route, Router } from '@angular/router'
import { UserCreateComponent } from './components/user-create/user-create.component'
import { UserComponent } from './components/user/user.component'
import { UserUpdateComponent } from './components/user-update/user-update.component'
import { UserDetailsComponent } from './components/user-details/user-details.component'
import { UsersListComponent } from './components/users-list/users-list.component'
import { Location } from '@angular/common'
import { JsonServerLandingComponent } from './components/json-server-landing/json-server-landing.component'


describe('Json-Server Routing-Module', () => {
  let fixture: ComponentFixture<JsonServerLandingComponent>
  let router: Router
  let location: Location

  function initRoutes (component : typeof UserUpdateComponent | 
                                  typeof UserCreateComponent | 
                                  typeof UserDetailsComponent | 
                                  typeof UsersListComponent | 
                                  typeof JsonServerLandingComponent ) 
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
                      UserDetailsComponent,
                      UsersListComponent,
                      JsonServerLandingComponent
                     ],
      imports: [RouterTestingModule.withRoutes(testRoutes)],
      providers : [ JsonServerRoutingModule ]
    })
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    fixture = TestBed.createComponent(JsonServerLandingComponent)
    router.initialNavigation()
  })

  it('should initialize the module', () => {
    const module = TestBed.inject(JsonServerRoutingModule)
    expect(module).toBeTruthy()
  })

  it('should have 5 routes', () => {
    const routes = testRoutes
    expect(routes.length).toEqual(5)
  })

  it('should use JsonServerLandingComponent with "/" path', fakeAsync(() => {
    initRoutes(JsonServerLandingComponent)
    expect(location.path()).toBe('/')
  }))

  it('should use UsersListComponent with "/users" path', fakeAsync(() => {
    initRoutes(UsersListComponent)
    expect(location.path()).toBe('/users')
  }))

  it('should use UserDetailsComponent with "/users/1" path', fakeAsync(() => {
    initRoutes(UserDetailsComponent)
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
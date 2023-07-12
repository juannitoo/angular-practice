import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { GlobalHttpErrorInterceptor } from './global-http-error.interceptor'
import { AuthInterceptor } from './auth.interceptor'

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
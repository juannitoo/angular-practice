import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { GlobalHttpErrorInterceptor } from './global-http-error.interceptor'

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorInterceptor, multi: true },
]
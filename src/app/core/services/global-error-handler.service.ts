import { Injectable, Injector, ErrorHandler, } from '@angular/core'
import { Router } from '@angular/router'

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  
  // Angular creates the error handler service before the providers.
  // donc on utilise injector pour provide le routeur
  constructor( private injector: Injector) { }
  
  handleError(error : Error) {
    let router = this.injector.get(Router);
    console.error(`Erreur Globale ici: ${router.url}
    ${error.message }`)
  }

}

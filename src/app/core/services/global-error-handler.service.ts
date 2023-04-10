import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, ErrorHandler, } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  
  subject$ = new BehaviorSubject<string>("step1")

  // Angular creates the error handler service before the providers.
  // donc on utilise injector pour provide le routeur
  constructor( private injector: Injector) { }
  
  handleError(error : any) {
    
    this.subject$.next('step2')

    let router = this.injector.get(Router);
    console.error(`Erreur Globale ici: ${router.url}
    ${error.message }`)
  }

}

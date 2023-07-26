import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from "rxjs"
import { catchError, startWith } from 'rxjs/operators'
import { Router } from "@angular/router"
import { ErrorsService } from "../core/services/errors.service"

// error component est dans shared
 
@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
    
  constructor(private router: Router,
              private errorsService: ErrorsService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event")
          } else {
            // console.log(`HTTP error status : ${error.status} ${error.statusText}`)

            switch (error.status) {

                case 0:  // status=0 for a failed XmlHttpRequest, json-server éteint,
                  const url = this.router.url
                  if (url.startsWith('/json-server')) {
                    this.errorsService.message = `Oups, un problème est survenu.
                      Le serveur de développement json-server n'est pas prévu pour fonctionner en ligne, c'est un module de développement.
                      Si vous avez téléchargé le repo en local, json-server doit certainement être absent, éteint ou mal configuré. 
                      Un fichier db.users.init est présent dans le repo angular-practice sous assets/db-json-server.json . 
                      Il faut le placer à la racine du serveur json-server. Ne vous inquiétez pas, vous ne loupez pas grand chose,
                      l'essentiel ici etant le code du service. C'est un CRUD fonctionnel basique. 
                      Ce message d'erreur est géré par un interceptor http, situé dans app/interceptors. \n
                      Voilà le message d'erreur :\n 
                      Impossible de récupérer les users. Error status : ${error.status} . Message : ${error.message}`
                  } else if (url.startsWith('/jsonplaceholder')) {
                    this.errorsService.message = `Oups, un problème est survenu. 
                      Le serveur jsonplaceholder doit certainement être défaillant. Faire apparaitre ce message a été plus compliqué
                      que sur la partie json-server dû au montage reactif et surtout de la strategie onPush(). Il a fallu utiliser
                      this.changeDetector.detectChanges() pour emettre les nouvelles modifications du typescript vers le template.
                      Voilà le message d'erreur :
                      Impossible de récupérer les users. Error status : ${error.status} Message : ${error.message}`
                  } else {
                    this.errorsService.message = `Oups, un problème est survenu. Error status : ${error.status} . Message : ${error.message}`
                  }
                  this.errorsService.httpErrors$.next({
                    error: error, 
                    message: this.errorsService.message
                  })
                  break

                case 401:   // authentication needed => login
                  // this.router.navigateByUrl("/login")
                  console.log(`http error interceptor, Erreur 401 : ${error.statusText}`)
                  break

                case 403:  // forbidden
                  console.log(`http error interceptor, Erreur 403 : ${error.statusText}`)
                  break

                case 404:  // ressource not foud
                  console.log(`http error interceptor, Erreur 404 : ${error.statusText}`)
                  break

                case 408:  // request timeout
                  console.log(`http error interceptor, Erreur 408 : ${error.statusText}`)
                  break

                case 429:  // too many request
                  console.log(`http error interceptor, Erreur 429 : ${error.statusText}`)
                  break

                case 500:  // The server has encountered a situation it does not know how to handle.
                  console.log(`http error interceptor, Erreur 500 : ${error.statusText}`)
                  break

                case 501:  // request method is not supported by the server 
                  console.log(`http error interceptor, Erreur 501 : ${error.statusText}`)
                  break

                case 502:  // the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
                  console.log(`http error interceptor, Erreur 502 : ${error.statusText}`)
                  break

                case 503: // The server is not ready to handle the request. down or overloaded
                  console.log(`http error interceptor, Erreur 503 : ${error.statusText}`)
                  break

                case 504: // gateway timeout
                  console.log(`http error interceptor, Erreur 504 : ${error.statusText}`)
                  break

              }
          } 
        } else {
          console.error(`Erreur générée par http error interceptor qui n'est pas une instance de httpErrorResponse`)
        }
        return throwError( () => { throw new Error(error) } )
      })
    )
  }
} 
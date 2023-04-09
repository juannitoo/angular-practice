import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from "rxjs"
import { catchError } from 'rxjs/operators'
import { Router } from "@angular/router"
import { ErrorsService } from "../services/errors.service"

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
            // console.log(`error status : ${error.status} ${error.statusText}`)

            switch (error.status) {

                case 0:  // json-server éteint, status=0 for a failed XmlHttpRequest
                  this.errorsService.message = `Oups, un problème est survenu.
                    Votre serveur json-server doit certainement être absent, éteint ou mal configuré. 
                    Un fichier db.users.init est présent dans le repo angular-practice sous assets/db-json-server.json . 
                    Il faut le placer à la racine du server. Vous pouvez toujours cloner mon autre repo 
                    github angular-json-server pour que ca fonctionne, ou faire un tour sur le repo de json-server sur github.
                    Voilà le message d'erreur :\n 
                    Impossible de récupérer les users. Error status : ${error.status} message : ${error.message}`
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
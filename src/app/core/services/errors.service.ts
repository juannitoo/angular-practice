import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// je ne suis pas ravi de ce service qui est un aveu de faiblesse
// car je n'arrive pas a récupérer l'emission' du subject si je le 
// définis dans global-error-handler.service
// Une histoire d'ordre de chargement j'imagine à cet instant,
// vu que c'est déjà le cas pour l'injection de dépendances.

@Injectable()
export class ErrorsService {

  message!: string
  httpErrors$ = new Subject<{error: Error, message: string}>()

  constructor() { }
}

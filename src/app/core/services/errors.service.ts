import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorsService {

  message!: string
  httpErrors$ = new Subject<{error: Error, message: string}>()

  constructor() { }
}

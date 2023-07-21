import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

// https://stackblitz.com/edit/angular-ivy-fy9eje?file=src%2Fapp%2Fuser.service.ts

export class isEmailUsedValidator {
  static createValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return authService
        .checkIfEmailUsed(control.value)
        .pipe(
          map( (result: boolean) => result ? { isEmailUsed : true } : null )
        )
    }
  }
}
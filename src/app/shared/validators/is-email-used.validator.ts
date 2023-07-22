import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

// https://stackblitz.com/edit/angular-ivy-fy9eje?file=src%2Fapp%2Fuser.service.ts
// https://www.concretepage.com/angular-2/angular-custom-async-validator-example

// export class isEmailUsedValidator {
//   static createValidator(authService: AuthService): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors> => {
//       return authService.checkIfEmailUsed(control.value).pipe(
//         map( (result: boolean) => result ? { 'isEmailUsed' : true } : null ),
//         tap( (x)=> {console.log("isEmailUsed interceptor : ",x)} ),
//         )
//     }
//   }
// }

export function isEmailUsedValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return authService.checkIfEmailIsUsed(control.value).pipe(
      map( (result : any) => result.resp === true ? { 'isEmailUsed' : true } : null ),
    )
  }
}

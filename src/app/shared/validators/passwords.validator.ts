import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
  
    const mainValue = ctrl.get(main)!.value
    const confirmValue = ctrl.get(confirm)!.value

    // console.log(mainValue, '------', confirmValue)   appelé 6 fois a l'init !
    
    return mainValue === confirmValue ? null : {
      confirmEqual: {
        main: mainValue,
        confirm: confirmValue
      }
    }
  }

}
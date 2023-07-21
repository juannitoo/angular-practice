import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        let pattern : RegExp = /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,5}/
        if (pattern.test(ctrl.value)) {
            return null;
        } else if (ctrl.value === "") {
            return null;
        } else {
            return {
                emailValidatorError: ctrl.value
            };
        }
    };
}
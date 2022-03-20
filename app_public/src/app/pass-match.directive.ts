import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const pass1 = control.get('password').value;

  // @ts-ignore
  const pass2 = control.get('password2').value;

  return pass1 !== pass2 ? { passwordsDontMatch: true } : null;
};

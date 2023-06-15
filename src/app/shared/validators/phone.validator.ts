import { AbstractControl } from '@angular/forms';
import { isPhoneNumber } from 'class-validator';

export function phoneValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    control.value !== undefined && control.value !== null && control.value !== '' && !isPhoneNumber(control.value)
  ) {
    return { phone: true };
  }

  return null;
}

import { AbstractControl } from '@angular/forms';
import { isIdentityCard } from 'class-validator';

export function nifValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    control.value !== undefined && control.value !== null && control.value !== '' && !isIdentityCard(control.value, 'ES')
  ) {
    return { nif: true };
  }

  return null;
}

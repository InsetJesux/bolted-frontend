import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'inputValid',
  pure: false,
})
export class InputValidPipe implements PipeTransform {

  transform(formControl: FormControl): boolean | null {
    return formControl?.errors && formControl?.touched;
  }

}

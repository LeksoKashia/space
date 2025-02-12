import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const LATIN_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const GEORGIAN_PATTERN = /^[ა-ჰ\s]+$/;

export function exclusiveLatinGeorgianValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const isLatin = LATIN_PATTERN.test(control.value);
    const isGeorgian = GEORGIAN_PATTERN.test(control.value);

    const valid = (isLatin && !isGeorgian) || (!isLatin && isGeorgian);

    return valid ? null : { invalidCharacters: true };
  };
}

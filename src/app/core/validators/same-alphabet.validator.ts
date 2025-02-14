import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

function isLatin(text: string): boolean {
  return /^[a-zA-Z\s]+$/.test(text);
}

function isGeorgian(text: string): boolean {
  return /^[\u10A0-\u10FF\s]+$/.test(text);
}

export const sameAlphabetValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const firstname = formGroup.get('firstname')?.value || '';
  const lastname = formGroup.get('lastname')?.value || '';

  if (!firstname || !lastname) return null;

  const isFirstnameLatin = isLatin(firstname);
  const isFirstnameGeorgian = isGeorgian(firstname);
  const isLastnameLatin = isLatin(lastname);
  const isLastnameGeorgian = isGeorgian(lastname);

  if (
    (isFirstnameLatin && !isLastnameLatin) ||
    (isFirstnameGeorgian && !isLastnameGeorgian)
  ) {
    return { mismatchedAlphabet: true };
  }

  return null;
};

import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

export class AsyncValidators {
  static uniqueAccountNumber(accountService: AccountService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return accountService
        .checkAccountNumberExists(control.value)
        .pipe(map((exists) => (exists ? { accountNumberExists: true } : null)));
    };
  }
}



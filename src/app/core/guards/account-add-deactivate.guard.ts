import { CanDeactivateFn } from '@angular/router';
import { AddAccountComponent } from '../../pages/client-details/add-account/add-account.component';

export const accountDeactivateGuard: CanDeactivateFn<AddAccountComponent> = (
  component: AddAccountComponent
) => {
  if (component.accountForm.dirty) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};

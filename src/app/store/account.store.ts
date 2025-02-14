import {
  signalState,
  signalStore,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Account } from '../core/models/account.model';
import { AccountService } from '../services/account.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { currentClientStore } from './current-client.store';
import { ToastService } from '../services/toast.service';

type AccountStore = {
  accounts: Account[];
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
};

const initialState = signalState<AccountStore>({
  accounts: [],
  isLoading: false,
  initialized: false,
  error: null,
});

export const AccountStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      accountService = inject(AccountService),
      currentStore = inject(currentClientStore),
      toastService = inject(ToastService)
    ) => ({
      loadAccounts: rxMethod<void>(
        pipe(
          switchMap(() => {
            return accountService.getAccounts();
          }),
          tap((response) => {
            patchState(store, {
              accounts: response,
            });
          })
        )
      ),
      addAccount: rxMethod<Account>(
        pipe(
          switchMap((account) => {
            return accountService.addAccount(account);
          }),
          tap((account) => {
            const updatedAccounts = [...store.accounts(), account];
            patchState(store, {
              accounts: updatedAccounts,
            });
            toastService.showSuccess('ანგარიში წარმატებით დაემატა')
          })
        )
      ),

      closeAccount: rxMethod<Account>(
        pipe(
          switchMap((account) => {
            return accountService.updateAccount(account);
          }),
          tap((account) => {
            const updatedAccounts = store
              .accounts()
              .map((c) => (c.id === account.id ? account : c));

            patchState(store, {
              accounts: updatedAccounts,
            });
            if(account.status === 'აქტიური'){
              toastService.showSuccess('ანგარიში წარმატეიბით გააქტიურდა')
            }else{
              toastService.showSuccess('ანგარიში წარმატეიბით დაიხურა')
            }
          })
        )
      ),
    })
  )
);

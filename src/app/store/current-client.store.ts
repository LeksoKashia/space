import {
  signalState,
  patchState,
  signalStore,
  withState,
  withMethods,
} from '@ngrx/signals';
import { Client } from '../core/models/client.model';
import { Account } from '../core/models/account.model';

type CurrentClientStore = {
  currentClient: Client;
  currentClientAccounts: Account[];
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
};

const initialState = signalState<CurrentClientStore>({
  currentClient: {} as Client,
  currentClientAccounts: [],
  isLoading: false,
  initialized: false,
  error: null,
});

export const currentClientStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setCurrentClient: (client: Client): void => {
      patchState(store, { currentClient: client });
    },

    setCurrentClientAccounts: (accounts: Account[]): void => {
      const filteredAccounts = accounts.filter(
        (account: Account) => account.clientId == store.currentClient().id
      );
      patchState(store, { currentClientAccounts: filteredAccounts });
    },
  }))
);

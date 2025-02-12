import {
  signalState,
  patchState,
  signalStore,
  withState,
  withHooks,
  withMethods,
  withComputed,
} from '@ngrx/signals';
import { Client } from '../core/models/client.model';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, effect, inject } from '@angular/core';
import { ClientService } from '../services/client.service';

type ClientStore = {
  clientsData: Client[];
  isLoading: boolean;
  error: Error | null;
  filter: any;
  initialized: boolean;
};

const initialState = signalState<ClientStore>({
  clientsData: [],
  isLoading: false,
  filter: {},
  initialized: false,
  error: null,
});

export const clientStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    clients: computed(() => {
      const filter = store.filter();
      console.log(filter);

      return store.clientsData().filter((client) =>
        Object.entries(filter).every(([key, value]) => {
          const normalizedValue = (value as string).toString().toLowerCase();

          if (key.endsWith('L')) {
            const property = key.replace('L', '');
            return (client.legalAddress as { [key: string]: any })?.[property]
              ?.toString()
              .toLowerCase()
              .includes(normalizedValue);
          }

          if (key.endsWith('A')) {
            const property = key.replace('A', '');
            return (client.actualAddress as { [key: string]: any })?.[property]
              ?.toString()
              .toLowerCase()
              .includes(normalizedValue);
          }

          return client[key as keyof Client]
            ?.toString()
            .toLowerCase()
            .includes(normalizedValue);
        })
      );
    }),
  })),
  withMethods((store, clientService = inject(ClientService)) => ({
    updateFilter: (filter: any): void => {
      patchState(store, { filter: filter });
    },
    loadUsers: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, (state) => ({
            isLoading: true,
          }));
        }),
        // delay(2000),
        switchMap(() => {
          return clientService.getClients();
        }),
        tap((clients) => {
          patchState(store, (state) => ({
            clientsData: clients,
            isLoading: false,
            initialized: true,
          }));
        })
      )
    ),

    addClient: rxMethod<Client>(
      pipe(
        switchMap((client) => {
          return clientService.addClient(client);
        }),
        tap((client) => {
          const updatedClients = [...store.clientsData(), client];
          patchState(store, {
            clientsData: updatedClients,
          });
        })
      )
    ),

    editClient: rxMethod<Client>(
      pipe(
        switchMap((client) => {
          return clientService.updateClient(client);
        }),
        tap((client) => {
          const updatedClients = store
            .clientsData()
            .map((c) => (c.id === client.id ? client : c));

          patchState(store, {
            clientsData: updatedClients,
          });
        })
      )
    ),

    removeClient: rxMethod<string>(
      pipe(
        tap((id) => {
          console.log(id);
        }),
        switchMap((id) => {
          return clientService.deleteRecipe(id);
        }),
        tap((res: Client) => {
          const updateClients = store
            .clientsData()
            .filter((client) => client.id !== res.id);

          patchState(store, {
            clientsData: updateClients,
          });
        })
      )
    ),
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        if (store.initialized()) {
          patchState(store, (state) => ({
            filter: JSON.parse(localStorage.getItem('filter') || '{}'),
          }));
        }
      });
    },
  })
);

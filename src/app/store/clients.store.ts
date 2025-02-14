import {
  signalState,
  patchState,
  signalStore,
  withState,
  withHooks,
  withMethods,
  withComputed,
  watchState,
} from '@ngrx/signals';
import { Client } from '../core/models/client.model';
import { delay, map, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, effect, inject } from '@angular/core';
import { ClientService } from '../services/client.service';
import { currentClientStore } from './current-client.store';
import { ToastService } from '../services/toast.service';

type ClientStore = {
  clientsData: Client[];
  isLoading: boolean;
  filter: any;
  initialized: boolean;
  error: Error | string | undefined;
  sort: {
    property: string;
    direction: 'asc' | 'desc';
  };
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  };
};

const initialState = signalState<ClientStore>({
  clientsData: [],
  isLoading: false,
  filter: {},
  initialized: false,
  error: undefined,
  sort: {
    property: 'firstName',
    direction: 'asc',
  },
  pagination: {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
  },
});

export const ClientStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    clients: computed(() => {
      const filter = store.filter();
      return store.clientsData().filter((client) => {
        if (filter.globalSearch) {
          const searchTerm = filter.globalSearch.toString().toLowerCase();

          const basicFieldsMatch = Object.entries(client).some(
            ([key, value]) => {
              if (key === 'legalAddress' || key === 'actualAddress')
                return false;
              return value?.toString().toLowerCase().includes(searchTerm);
            }
          );

          const legalAddressMatch = Object.values(
            client.legalAddress || {}
          ).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm)
          );

          const actualAddressMatch = Object.values(
            client.actualAddress || {}
          ).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm)
          );

          return basicFieldsMatch || legalAddressMatch || actualAddressMatch;
        }

        return Object.entries(filter).every(([key, value]) => {
          if (key === 'globalSearch') return true;

          const normalizedValue = (value as string).toString().toLowerCase();

          const checkAddress = (
            addressKey: string,
            addressType: 'legalAddress' | 'actualAddress'
          ) => {
            const property = key.replace(addressKey, '');
            return (client[addressType] as { [key: string]: any })?.[property]
              ?.toString()
              .toLowerCase()
              .includes(normalizedValue);
          };

          if (key.endsWith('L')) {
            return checkAddress('L', 'legalAddress');
          }

          if (key.endsWith('A')) {
            return checkAddress('A', 'actualAddress');
          }

          return client[key as keyof Client]
            ?.toString()
            .toLowerCase()
            .includes(normalizedValue);
        });
      });
    }),
  })),
  withMethods(
    (
      store,
      clientService = inject(ClientService),
      currentClient = inject(currentClientStore),
      toastService = inject(ToastService)
    ) => ({
      updateFilter: (filter: any): void => {
        patchState(store, { filter: filter });
      },
      updateSort: (sort: {
        property: string;
        direction: 'asc' | 'desc';
      }): void => {
        patchState(store, { sort });
        localStorage.setItem('clientSort', JSON.stringify(sort));
      },
      updatePagination: (pagination: {
        pageIndex: number;
        pageSize: number;
        totalCount?: number;
      }): void => {
        patchState(store, (state) => ({
          pagination: {
            ...state.pagination,
            ...pagination,
          },
        }));
        localStorage.setItem(
          'clientPagination',
          JSON.stringify(store.pagination())
        );
      },
      loadClients: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, (state) => ({
              isLoading: true,
            }));
          }),
          delay(300),
          switchMap(() => {
            const sort = store.sort();
            const pagination = store.pagination();
            console.log(sort, pagination);

            return clientService.getClients(pagination, sort);
          }),
          tap(({ data, totalCount }) => {
            patchState(store, {
              clientsData: data,
              pagination: {
                ...store.pagination(),
                totalCount: totalCount,
              },
              isLoading: false,
              initialized: true,
            });
          })
        )
      ),

      addClient: rxMethod<Client>(
        pipe(
          switchMap((client) => {
            return clientService.addClient(client);
          }),
          tap((client) => {
            const updatedClients = [client, ...store.clientsData()];
            patchState(store, {
              clientsData: updatedClients,
            });

            toastService.showSuccess('კლიენტი წარმატებით დაემატა');
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
            toastService.showSuccess('კლიენტი წარმატებით განახლდა');
          })
        )
      ),

      removeClient: rxMethod<string>(
        pipe(
          switchMap((id) => {
            return clientService.deleteClient(id).pipe(
              map(() => ({
                id,
              }))
            );
          }),
          tap((res: any) => {
            const updateClients = store
              .clientsData()
              .filter((client) => client.id !== res.id);

            patchState(store, {
              clientsData: updateClients,
            });
            toastService.showSuccess('კლიენტი წარმატებით წაიშალა');
          })
        )
      ),

      loadClientById: rxMethod<number>(
        pipe(
          tap((res) => {
            console.log('client with id', res);
          }),
          switchMap((id) => {
            return clientService.getClientById(id);
          }),
          tap((client) => {
            currentClient.setCurrentClient(client);
          })
        )
      ),
      setError: (error: Error | string | undefined): void => {
        patchState(store, { error });
        if (error == undefined) {
          return;
        }
        toastService.showError(error?.toString());
      },
    })
  ),

  withHooks({
    onInit(store) {
      const sort = JSON.parse(
        localStorage.getItem('clientSort') ||
          '{"property":"firstName","direction":"asc"}'
      );
      const pagination = JSON.parse(
        localStorage.getItem('clientPagination') ||
          '{"pageIndex":1,"pageSize":10,"totalCount":0}'
      );
      patchState(store, { sort, pagination });
      patchState(store, { sort, pagination });
      effect(() => {
        if (store.initialized()) {
          patchState(store, (state) => ({
            filter: JSON.parse(localStorage.getItem('filter') || '{}'),
          }));
        }
      });

      // watchState(store, (state) => {
      //   console.log(store.pagination());
      // });
    },
  })
);

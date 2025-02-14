import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientStore } from '../../store/clients.store';

export const clientResolver: ResolveFn<any> = (route, state) => {
  const store = inject(ClientStore);
  const clientId = Number(route.paramMap.get('id'));
  return store.loadClientById(clientId);
};

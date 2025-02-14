import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TabService } from '../../services/tab.service';
import { currentClientStore } from '../../store/current-client.store';

export const accountAddGuard: CanActivateFn = (route, state) => {
  const tabService = inject(TabService);
  const currentClient = inject(currentClientStore);
  const client = currentClient.currentClient();

  if (client) {
    tabService.tabIndexValue.set(3);
    return true;
  } else {
    tabService.tabIndexValue.set(0);
    return false;
  }
};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TabService } from '../../../services/tab.service';
import { AccountStore } from '../../../store/account.store';

export const accountsResolver: ResolveFn<any> = () => {
  const tabService = inject(TabService);
  const store = inject(AccountStore);
  tabService.tabIndexValue.set(2);
  store.loadAccounts();
  return;
};

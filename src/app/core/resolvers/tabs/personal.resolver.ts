import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TabService } from '../../../services/tab.service';

export const personalResolver: ResolveFn<any> = () => {
  const tabService = inject(TabService);
  tabService.tabIndexValue.set(0);
  return;
};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TabService } from '../../../services/tab.service';

export const addressResolver: ResolveFn<any> = () => {
  const tabService = inject(TabService);
  tabService.tabIndexValue.set(1);
  return;
};

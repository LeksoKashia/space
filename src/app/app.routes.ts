import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppUrlEnum } from './core/const/routes.const';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${AppUrlEnum.CLIENT}/${AppUrlEnum.LIST}`,
    pathMatch: 'full',
  },
  {
    path: `${AppUrlEnum.CLIENT}/${AppUrlEnum.LIST}`,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: `/${AppUrlEnum.CLIENT}/${AppUrlEnum.LIST}`,
  },
];

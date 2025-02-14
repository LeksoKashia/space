import { Routes } from '@angular/router';
import { AppUrlEnum } from './core/const/routes.const';
import { clientDetailsRoutes } from './pages/client-details/client-details.routes';

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
    path: AppUrlEnum.CLIENT,
    children: clientDetailsRoutes,
  },
  {
    path: '**',
    redirectTo: `/${AppUrlEnum.CLIENT}/${AppUrlEnum.LIST}`,
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';
import { clientResolver } from '../../core/resolvers/client.resolver';
import { personalResolver } from '../../core/resolvers/tabs/personal.resolver';
import { addressResolver } from '../../core/resolvers/tabs/address.resolver';
import { accountsResolver } from '../../core/resolvers/tabs/accounts.resolver';
import { accountAddGuard } from '../../core/guards/account-add-activate.guard';
import { accountDeactivateGuard } from '../../core/guards/account-add-deactivate.guard';
import { AppUrlEnum } from '../../core/const/routes.const';
export const clientDetailsRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./client-details.component').then(
        (m) => m.ClientDetailsComponent
      ),
    resolve: {
      client: clientResolver,
    },
    children: [
      {
        path: '',
        redirectTo: `${AppUrlEnum.PERSONAL}`,
        pathMatch: 'full',
      },
      {
        path: `${AppUrlEnum.PERSONAL}`,
        loadComponent: () =>
          import('./personal-info/personal-info.component').then(
            (m) => m.PersonalInfoComponent
          ),
        resolve: {
          tabIndex: personalResolver,
        },
      },
      {
        path: `${AppUrlEnum.ADDRESS}`,
        loadComponent: () =>
          import('./address-info/address-info.component').then(
            (m) => m.AddressInfoComponent
          ),
        resolve: {
          tabIndex: addressResolver,
        },
      },
      {
        path: `${AppUrlEnum.ACCOUNT}`,
        loadComponent: () =>
          import('./account-info/account-info.component').then(
            (m) => m.AccountInfoComponent
          ),
        resolve: {
          tabIndex: accountsResolver,
        },
      },
      {
        path: `${AppUrlEnum.ACCOUNT}/${AppUrlEnum.ADD}`,
        loadComponent: () =>
          import('./add-account/add-account.component').then(
            (m) => m.AddAccountComponent
          ),
        canActivate: [accountAddGuard],
        canDeactivate: [accountDeactivateGuard],
      },
    ],
  },
];

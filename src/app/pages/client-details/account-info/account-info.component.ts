import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { currentClientStore } from '../../../store/current-client.store';
import { AccountStore } from '../../../store/account.store';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../core/models/account.model';

@Component({
  selector: 'space-account-info',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChipModule,
    GalleriaModule,
    FormsModule,
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoComponent {
  currentStore = inject(currentClientStore);
  accountStore = inject(AccountStore);
  accounts = computed(() => this.accountStore.accounts());
  activeIndex: number = 0;

  constructor() {
    effect(() => {
      this.currentStore.setCurrentClientAccounts(this.accounts());
    });
  }

  closeAccount(account: Account) {
    account = {
      ...account,
      status: account.status == 'დახურული' ? 'აქტიური' : 'დახურული',
    };
    this.accountStore.closeAccount(account);
  }
}

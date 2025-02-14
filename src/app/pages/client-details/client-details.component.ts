import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { currentClientStore } from '../../store/current-client.store';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabService } from '../../services/tab.service';
import { AccountStore } from '../../store/account.store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'space-client-details',
  imports: [
    PanelModule,
    TabsModule,
    AvatarModule,
    CommonModule,
    CardModule,
    ButtonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-out', style({ opacity: 1 }))]),
    ]),

    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-20px)', opacity: 0 })),
      transition(':enter', [
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),

    trigger('scaleUp', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.1)' })),
      transition('normal <=> hover', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ClientDetailsComponent {
  private store = inject(currentClientStore);
  private accountStore = inject(AccountStore);
  private tabService = inject(TabService);
  client = computed(() => this.store.currentClient());
  value = computed(() => this.tabService.tabIndexValue());

  constructor() {
    this.accountStore.loadAccounts();
  }

  avatarState = 'normal';

  onMouseEnter() {
    this.avatarState = 'hover';
  }

  onMouseLeave() {
    this.avatarState = 'normal';
  }
}

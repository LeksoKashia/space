import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { currentClientStore } from '../../../store/current-client.store';
import { TabService } from '../../../services/tab.service';
@Component({
  selector: 'space-address-info',
  imports: [TabsModule],
  templateUrl: './address-info.component.html',
  styleUrls: [
    './address-info.component.scss',
    '../personal-info/personal-info.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent {
  private store = inject(currentClientStore);
  client = computed(() => this.store.currentClient());
}

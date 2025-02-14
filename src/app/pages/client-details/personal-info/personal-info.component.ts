import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { currentClientStore } from '../../../store/current-client.store';
import { TabService } from '../../../services/tab.service';

@Component({
  selector: 'space-personal-info',
  imports: [TabsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  private store = inject(currentClientStore);
  private tabService = inject(TabService);
  client = computed(() => this.store.currentClient());

  ngOnInit(): void {
    this.tabService.tabIndexValue.set(0);
  }
}

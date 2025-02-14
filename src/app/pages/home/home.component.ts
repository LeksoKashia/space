import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ClientStore } from '../../store/clients.store';
import { ClientListComponent } from '../../components/client-list/client-list.component';
import { AdvancedFilterComponent } from '../../components/advanced-filter/advanced-filter.component';

@Component({
  selector: 'space-home',
  imports: [ClientListComponent, AdvancedFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  store = inject(ClientStore);

  ngOnInit(): void {
    this.store.loadClients();
  }
}

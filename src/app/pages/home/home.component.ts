import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { clientStore } from '../../store/clients.store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ClientListComponent } from '../../components/client-list/client-list.component';
import { AdvancedFilterComponent } from '../../components/advanced-filter/advanced-filter.component';

@Component({
  selector: 'space-home',
  imports: [ProgressSpinner, ClientListComponent, AdvancedFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  store = inject(clientStore);

  ngOnInit(): void {
    this.store.loadUsers();
  }
}

// client: Client = {
//   clientId: '1',
//   firstname: 'John',
//   lastname: 'Doe',
//   gender: 'ქალი',
//   idNumber: '123456',
//   mobile: '123456',
//   legalAddress: {
//     country: 'USA',
//     city: 'New York',
//     street: 'Wall Street',
//   },
//   actualAddress: {
//     country: 'USA',
//     city: 'New York',
//     street: 'Wall Street',
//   },
// };

// ngOnInit(): void {
//   this.getClients();
// }

// addClient(): void {
//   this.clientService.addClient(this.client).subscribe((client) => {
//     console.log('Client added:', client);
//     this.getClients();
//   });
// }

// getClients(): void {
//   this.clientService.getClients().subscribe((clients) => {
//     console.log('Clients:', clients);
//   });
// }

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { Client } from '../../core/models/client.model';
import { Table, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import table from '../../data/table.json';
import { TreeSelectModule } from 'primeng/treeselect';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AddressPipe } from '../../core/pipes/address.pipe';
import { Tooltip } from 'primeng/tooltip';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { RouterLink } from '@angular/router';
import { AppUrlEnum } from '../../core/const/routes.const';
import { ClientStore } from '../../store/clients.store';

@Component({
  selector: 'space-client-list',
  imports: [
    TableModule,
    PaginatorModule,
    TreeSelectModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    AddressPipe,
    DialogConfirmComponent,
    Tooltip,
    AddEditClientComponent,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  clientStore = inject(ClientStore);
  @Input() clients!: Client[];
  @ViewChild(DialogConfirmComponent)
  spaceDialog!: DialogConfirmComponent;
  @ViewChild('dt', { static: false }) table!: Table;
  client = signal<Client | null>(null);
  clientAction = signal<string>('');
  showDialog: boolean = false;
  UrlEnum = AppUrlEnum;
  globalFilterFields: string[] = table.globalFilterFields;
  mainColumns: { field: string; header: string }[] = table.mainColumns;
  pagination = computed(() => this.clientStore.pagination());

  currentSort: { field: string; order: number } | null = null;

  onSortChange(event: any): void {
    const property = event.multisortmeta[0].field;
    let direction: 'asc' | 'desc';

    if (this.clientStore.sort().property === property) {
      direction = this.clientStore.sort().direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'desc';
    }

    this.currentSort = {
      field: property,
      order: direction === 'asc' ? 1 : -1,
    };

    this.clientStore.updateSort({
      property: property,
      direction: direction,
    });

    this.clientStore.loadClients();
  }

  onPageChange(event: any): void {
    this.clientStore.updatePagination({
      pageIndex: event.first / event.rows + 1,
      pageSize: event.rows,
    });
    this.clientStore.loadClients();
  }

  deleteClient(event: Event, id: string) {
    this.spaceDialog.deleteRecord(event, id);
  }
  editClient(id: string, client: Client) {
    this.client.set(client);
    this.showDialog = true;
    this.clientAction.set('edit');
  }

  onCancel() {
    this.showDialog = false;
    this.clientAction.set('');
    this.client.set(null);
  }
}

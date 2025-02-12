import {
  ChangeDetectionStrategy,
  Component,
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
import { AddEditClientComponent } from '../../shared/add-edit-client/add-edit-client.component';

@Component({
  selector: 'space-client-list',
  imports: [
    TableModule,
    PaginatorModule,
    TreeSelectModule,
    ReactiveFormsModule,
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
  @Input() clients!: Client[];
  @ViewChild(DialogConfirmComponent)
  spaceDialog!: DialogConfirmComponent;
  client = signal<Client | null>(null);
  clientAction = signal<string>('');
  showDialog: boolean = false;
  globalFilterFields: string[] = table.globalFilterFields;
  mainColumns: { field: string; header: string }[] = table.mainColumns;

  legalAddressSortOptions: MenuItem[] = [];
  actualAddressSortOptions: MenuItem[] = [];

  @ViewChild('dt', { static: false }) table!: Table;

  ngOnInit() {}

  //actions
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

// <th class="custom-th" (click)="menu2.toggle($event)">
//         <div class="header-cell">
//           <span>Legal Address</span>
//           <i class="pi pi-sort"></i>
//           <p-menu
//             #menu1
//             [popup]="true"
//             [model]="legalAddressSortOptions"
//             [appendTo]="'body'"
//             [baseZIndex]="1000"
//           ></p-menu>
//         </div>
//       </th>
//       <th class="custom-th" (click)="menu2.toggle($event)">
//         <div class="header-cell">
//           <span>Actual Address</span>
//           <i class="pi pi-sort"></i>
//           <p-menu
//             #menu2
//             [popup]="true"
//             [model]="actualAddressSortOptions"
//             [appendTo]="'body'"
//             [baseZIndex]="1000"
//           ></p-menu>
//         </div>
//       </th>
//       <th>Actions</th>

// private initSortOptions() {
//   // this.legalAddressSortOptions = [
//   //   {
//   //     label: 'Sort by Country',
//   //     command: () => this.sortBy('legalAddress.country'),
//   //   },
//   //   {
//   //     label: 'Sort by City',
//   //     command: () => this.sortBy('legalAddress.city'),
//   //   },
//   //   {
//   //     label: 'Sort by Street',
//   //     command: () => this.sortBy('legalAddress.street'),
//   //   },
//   // ];

//   // this.actualAddressSortOptions = [
//   //   {
//   //     label: 'Sort by Country',
//   //     command: () => this.sortBy('actualAddress.country'),
//   //   },
//   //   {
//   //     label: 'Sort by City',
//   //     command: () => this.sortBy('actualAddress.city'),
//   //   },
//   //   {
//   //     label: 'Sort by Street',
//   //     command: () => this.sortBy('actualAddress.street'),
//   //   },
//   // ];
// }

// // sortBy(field: string) {
// //   this.table.sortOrder = 1;
// //   this.table.sortField = field;
// //   this.table.sortSingle();
// // }

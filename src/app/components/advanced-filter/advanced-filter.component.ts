import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
} from '@angular/core';
import { Client } from '../../core/models/client.model';
import { TableModule } from 'primeng/table';
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
import { NodeService } from '../../services/node.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { CommonModule } from '@angular/common';
import { clientStore } from '../../store/clients.store';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TreeNode } from '../../core/models/node.model';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'space-advanced-filter',
  imports: [
    TableModule,
    PaginatorModule,
    TreeSelectModule,
    ReactiveFormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './advanced-filter.component.html',
  styleUrl: './advanced-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterComponent {
  clientStore = inject(clientStore);
  fb: FormBuilder = inject(FormBuilder);
  nodes: TreeNode[] = [];
  filterForm: FormGroup;
  filter: any;
  filterFiledsCount: number = 0;
  items: {
    label?: string;
    icon?: string;
    separator?: boolean;
    command?: () => void;
  }[] = [];

  constructor(private nodeService: NodeService) {
    this.filterForm = this.fb.group({
      selectedNodes: [null],
      // keyword: [null],
    });
  }

  ngOnInit(): void {
    this.initalizeNodes();
    this.selectedNodesChange();
    this.formValueChange();
    this.initalizeForm();
    this.items = [
      {
        label: 'Reset',
        icon: PrimeIcons.TRASH,
        command: () => this.resetForm(),
      },
      {
        label: 'Clear',
        icon: PrimeIcons.FILTER,
        command: () => this.clearForm(),
      },
      // {
      //   separator: true,
      // },
      // {
      //   label: 'Delete',
      //   icon: 'pi pi-times',
      // },
    ];
  }

  //actions
  applyFilters() {
    const filterData: { [key: string]: any } = {};

    for (const key of Object.keys(this.filterForm.value)) {
      if (key !== 'selectedNodes' && this.filterForm.get(key)?.value) {
        console.log(this.filterForm.get(key)?.value);

        filterData[key] = this.filterForm.get(key)?.value;
      }
    }

    this.filter = filterData;
    console.log(this.filter);

    localStorage.setItem('filter', JSON.stringify(filterData));
    localStorage.setItem('filterForm', JSON.stringify(this.filterForm.value));
    this.clientStore.updateFilter(filterData);
  }

  resetForm() {
    this.filterForm.reset();
    Object.keys(this.filterForm?.controls).forEach((control) => {
      if (control !== 'selectedNodes') {
        this.filterForm.removeControl(control);
        this.filterFiledsCount--;
      }
    });
    localStorage.removeItem('filter');
    localStorage.setItem('filterForm', JSON.stringify(this.filterForm.value));
    this.clientStore.updateFilter({});
  }

  clearForm() {
    Object.keys(this.filterForm?.controls).forEach((control) => {
      if (control !== 'selectedNodes') {
        this.filterForm.get(control)?.patchValue('');
      }
    });
    this.clientStore.updateFilter({});
  }

  private formValueChange() {
    this.filterForm.valueChanges.subscribe(() =>
      localStorage.setItem('filterForm', JSON.stringify(this.filterForm.value))
    );
  }

  private selectedNodesChange() {
    this.filterForm
      .get('selectedNodes')
      ?.valueChanges.subscribe((selectedNodes) => {
        if (selectedNodes) {
          const simpleNodes = selectedNodes.map((node: any) => ({
            label: node.label,
            key: node.key,
          }));
          this.filterForm.patchValue(
            { selectedNodes: simpleNodes },
            { emitEvent: false }
          );
          this.updateFormControls(simpleNodes);
        }
      });
  }

  private initalizeForm() {
    // Load saved form state
    const savedForm = localStorage.getItem('filterForm');
    if (savedForm) {
      try {
        const formValue = JSON.parse(savedForm);
        this.filterForm.patchValue(formValue);
        this.updateFormControls(formValue.selectedNodes || []);
      } catch (error) {
        console.error('Error loading form:', error);
      }
    }
  }

  private initalizeNodes() {
    this.nodeService
      .getFiles()
      .then((files: TreeNode[]) => (this.nodes = files));
  }

  private updateFormControls(selectedNodes: TreeNode[]): void {
    const selectedLabels = selectedNodes.map((node) => node.label);

    selectedLabels.forEach((label) => {
      if (!this.filterForm.contains(label)) {
        this.filterForm.addControl(label, this.fb.control(''));
        this.filterFiledsCount++;
      }
    });

    Object.keys(this.filterForm?.controls).forEach((control) => {
      if (control !== 'selectedNodes' && !selectedLabels.includes(control)) {
        this.filterForm.removeControl(control);
        this.filterFiledsCount--;
      }
    });
  }
}

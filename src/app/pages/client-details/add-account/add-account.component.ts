import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { currentClientStore } from '../../../store/current-client.store';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { AccountStore } from '../../../store/account.store';
import { AsyncValidators } from '../../../core/validators/async-validators';
import { AccountService } from '../../../services/account.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import account from '../../../data/account.json';
@Component({
  selector: 'space-add-account',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    CommonModule,
    RadioButtonModule,
    NgxMaskDirective,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss',
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAccountComponent {
  private currentClient = inject(currentClientStore);
  private accountStore = inject(AccountStore);
  private fb: FormBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  client = computed(() => this.currentClient.currentClient());
  accountForm!: FormGroup;
  accountTypes = account.accountTypes;
  currency = account.currency;

  constructor() {
    this.initForm();
  }

  ngOnInit() {
    this.accountForm.statusChanges.subscribe((value) => {
      console.log(value);
    });
  }

  initForm() {
    this.accountForm = this.fb.group({
      clientId: [],
      accountNumber: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [
            AsyncValidators.uniqueAccountNumber(this.accountService),
          ],
        },
      ],
      status: ['აქტიური'],
      type: ['', Validators.required],
      currency: [[], Validators.required],
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountStore.addAccount({
        ...this.accountForm.value,
        clientId: this.client().id,
      });
      this.accountForm.reset();
      this.accountForm.get('accountNumber')?.markAsUntouched();
      this.accountForm.get('accountNumber')?.markAsPristine();
    } else {
      this.toastService.showError('form invalid');
    }
  }
}

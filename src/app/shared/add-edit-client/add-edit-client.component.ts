import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Gender } from '../../core/models/enums';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../core/models/client.model';
import { ImageModule } from 'primeng/image';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { clientStore } from '../../store/clients.store';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { exclusiveLatinGeorgianValidator } from '../../core/validators/georgian-latin.validator';
import { Message } from 'primeng/message';

@Component({
  selector: 'space-add-edit-client',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ImageModule,
    FileUpload,
    CommonModule,
    ToastModule,
    NgxMaskDirective,
    FloatLabelModule,
    Message,
  ],
  templateUrl: './add-edit-client.component.html',
  styleUrl: './add-edit-client.component.scss',
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditClientComponent {
  client = input<Client | null>();
  action = input<string>();
  @Input() visible: boolean = false;
  @Output() changeVisibility = new EventEmitter();
  @Output() saveClient = new EventEmitter<Client>();

  clientStore = inject(clientStore);
  messageService = inject(MessageService);
  toastService = inject(ToastService);

  clientForm!: FormGroup;
  imagePreview = signal('');
  uploadedFiles: any[] = [];
  genders: { label: string; value: Gender }[] = [
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();

    effect(() => {
      console.log(this.action());

      const currentClient = this.client();
      if (currentClient && this.action() === 'edit') {
        this.clientForm.patchValue(currentClient);
        this.imagePreview.set(currentClient.image || 'placeholder.png');
      } else {
        this.imagePreview.set('placeholder.png');
      }
    });
  }

  initForm() {
    this.clientForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          exclusiveLatinGeorgianValidator(),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          exclusiveLatinGeorgianValidator(),
        ],
      ],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^5/),
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      ],
      gender: ['', Validators.required],
      legalAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
      actualAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
      image: [''],
    });
  }

  onSubmit(): void {
    if (!this.clientForm.valid) {
      return;
    }

    if (this.action() === 'edit') {
      this.saveClient.emit(this.clientForm.value);
      this.clientStore.editClient({
        ...this.clientForm.value,
        id: this.client()?.id,
      });
      this.toastService.showSuccess('Client successfully updated');
      this.onCancel();
    } else if (this.action() === 'add') {
      console.log('kaiaa');
      this.clientStore.addClient(this.clientForm.value);
      this.toastService.showSuccess('Client successfully added');
      this.onCancel();
    }
  }

  onCancel(): void {
    this.changeVisibility.emit();
    this.clientForm.reset();
    this.clientForm.get('mobile')?.markAsPristine();
    this.clientForm.get('mobile')?.markAsUntouched();
    this.imagePreview.set('');
  }

  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    this.toastService.showSuccess('File uploaded successfully');
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imagePreview.set(reader.result);
        }
        this.clientForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}

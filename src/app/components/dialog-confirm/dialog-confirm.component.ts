import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClientStore } from '../../store/clients.store';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'space-dialog-confirm',
  imports: [ConfirmDialog, ToastModule],
  template: `<p-confirmdialog /> <p-toast />`,
  styleUrl: './dialog-confirm.component.scss',
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmComponent {
  clientStore = inject(ClientStore);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  toastService = inject(ToastService);

  deleteRecord(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'ნამდვილად გსურთ კლიენტის წაშლა ?',
      header: 'კლიენტის წაშლა',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'დახურვა',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'წაშლა',
        severity: 'danger',
      },

      accept: () => {
        this.clientStore.removeClient(id);
      },
      reject: () => {
        this.toastService.showInfo('კლიენტის წაშლა გადავიფიქრეთ');
      },
    });
  }
}

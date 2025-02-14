import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'წარმატება',
      detail: message,
    });
  }

  showError(message: string | undefined): void {
    this.messageService.add({
      severity: 'error',
      summary: 'პრობლემა',
      detail: message,
    });
  }

  showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'ინფორმაციული',
      detail: message,
    });
  }

  showWarn(message: string): void {
    this.messageService.add({
      severity: 'warning',
      summary: 'გაფრთხილება',
      detail: message,
    });
  }
}

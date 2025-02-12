import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet, ToastModule],
  styleUrl: './app.component.scss',
  template: `
    <p-toast />
    <space-layout>
      <router-outlet></router-outlet>
    </space-layout>
  `,
})
export class AppComponent {}

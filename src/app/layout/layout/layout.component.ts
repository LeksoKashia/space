import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'space-layout',
  imports: [
    BadgeModule,
    AvatarModule,
    CommonModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    HeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

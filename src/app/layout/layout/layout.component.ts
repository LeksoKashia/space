import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
// import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { NavbarItems } from '../../core/const/navbar.const';
import { ThemeService } from '../../services/theme.service';
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
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class LayoutComponent {
  navbarItems = NavbarItems;
  constructor(public themeService: ThemeService) {}
}

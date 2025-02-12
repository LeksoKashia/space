import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NavbarItems } from '../../core/const/navbar.const';
import { ThemeService } from '../../services/theme.service';
import { ButtonModule } from 'primeng/button';
import { AddEditClientComponent } from '../../shared/add-edit-client/add-edit-client.component';

@Component({
  selector: 'space-header',
  imports: [ButtonModule, AddEditClientComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  navbarItems = NavbarItems;

  clientAction = signal<string>('');
  showDialog = signal<boolean>(false);
}

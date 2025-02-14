import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ButtonModule } from 'primeng/button';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'space-header',
  imports: [ButtonModule, AddEditClientComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  clientAction = signal<string>('');
  showDialog = signal<boolean>(false);
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(this.getStoredTheme());

  constructor() {
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    this.applyTheme();
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode()));
  }

  private applyTheme() {
    const htmlElement = document.documentElement;
    if (this.isDarkMode()) {
      htmlElement.classList.add('my-app-dark');
    } else {
      htmlElement.classList.remove('my-app-dark');
    }
  }
  private getStoredTheme(): boolean {
    const storedTheme = localStorage.getItem('darkMode');
    return storedTheme !== null ? JSON.parse(storedTheme) : true;
  }
}

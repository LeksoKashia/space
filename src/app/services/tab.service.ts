import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabIndexValue = signal<number>(0);
}

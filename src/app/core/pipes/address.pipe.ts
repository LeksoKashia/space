import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address.model';

@Pipe({
  name: 'address',
  standalone: true
})
export class AddressPipe implements PipeTransform {
  transform(value: Address, ...args: unknown[]): unknown {
    return `${value.country}, ${value.city}, ${value.street}`;
  }
}

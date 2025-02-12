import { Address } from './address.model';
import { Gender } from './enums';

export interface Client {
  id: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  idNumber: string;
  mobile: string;
  legalAddress: Address;
  actualAddress: Address;
  image?: string;
  // [key: string]: any;
}

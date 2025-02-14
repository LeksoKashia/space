import { Address } from './address.model';
import { Gender } from '../const/model.enums';

export interface Client {
  id: number;
  firstname: string;
  lastname: string;
  gender: Gender;
  idNumber: string;
  mobile: string;
  legalAddress: Address;
  actualAddress: Address;
  image?: string;
}

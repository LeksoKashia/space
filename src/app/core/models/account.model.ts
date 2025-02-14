import { AccountStatus, AccountType, Currency } from '../const/model.enums';

export interface Account {
  id: number;
  accountNumber: string;
  clientId: number;
  type: AccountType;
  currency: Currency[];
  status: AccountStatus;
}

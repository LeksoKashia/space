import { AccountStatus, AccountType, Currency } from './enums';

export interface Account {
  accountNumber: number;
  cliendId: number;
  type: AccountType;
  currency: Currency;
  status: AccountStatus;
}

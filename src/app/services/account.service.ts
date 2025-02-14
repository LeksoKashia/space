import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiEnum } from '../core/const/api.enums';
import { Account } from '../core/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl_api}/${ApiEnum.ACCOUNTS}`;

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getaAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }
  deleteAccount(id: string | number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Account>(url);
  }
  checkAccountNumberExists(accountNumber: string): Observable<boolean> {
    console.log(accountNumber);
    console.log('Checking account number:', accountNumber);

    return this.getAccounts().pipe(
      delay(1000),
      map((accounts) =>
        accounts.some((account) => account.accountNumber === accountNumber)
      )
    );
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${account.id}`, account);
  }
}

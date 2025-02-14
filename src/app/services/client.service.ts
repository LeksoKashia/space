import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Client } from '../core/models/client.model';
import { environment } from '../../environments/environment';
import { ApiEnum } from '../core/const/api.enums';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl_api}/${ApiEnum.CLIENTS}`;

  getClients(
    pagination: { pageIndex: number; pageSize: number },
    sort: { property: string; direction: 'asc' | 'desc' }
  ): Observable<{ data: Client[]; totalCount: number }> {
    const params = new HttpParams()
      .set('_page', pagination.pageIndex.toString())
      .set('_limit', pagination.pageSize.toString())
      .set('_sort', sort.property)
      .set('_order', sort.direction);

    return this.http
      .get<Client[]>(this.apiUrl, { observe: 'response', params })
      .pipe(
        map((response) => ({
          data: response.body as Client[],
          totalCount: +(response.headers.get('X-Total-Count') ?? 0),
        }))
      );
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }
  deleteClient(id: string | number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Client>(url);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }
}

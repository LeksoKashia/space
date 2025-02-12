import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../core/models/client.model';
import { environment } from '../../environments/environment';
import { ApiEnum } from '../core/const/api.enums';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.baseUrl_api}/${ApiEnum.CLIENTS}`;

  constructor(private http: HttpClient) {}
  deleteRecipe(id: string | number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }
}

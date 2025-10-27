import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { Client } from '../models/client.module';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/clients';
  private refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly clients$ = this.refreshTrigger.asObservable().pipe(
    switchMap(() => this.getClients()),
    shareReplay(1),
  );

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client).pipe(
      tap(() => {
        this.refreshTrigger.next();
      }),
    );
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.refreshTrigger.next();
      }),
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  updateClient(id: string, clientData: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, clientData).pipe(
      tap(() => {
        this.refreshTrigger.next();
      }),
    );
  }
}

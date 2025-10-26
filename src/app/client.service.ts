import { HttpClient } from '@angular/common/http';

export class ClientService {
  constructor(protected http: HttpClient) {}

  getClients() {
    return this.http.get('http://localhost:3000/clients');
  }

  createClient(client: { name: string; email: string }) {
    return this.http.post('http://localhost:3000/clients/', client);
  }
}

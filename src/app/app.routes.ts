import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { HomeComponenet } from './home.component';

export const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: '',
    component: HomeComponenet,
  },
];

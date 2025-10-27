import { Routes } from '@angular/router';
import { ClientsOverviewComponent } from './components/clients-overview/clients-overview.component';
import { HomeComponenet } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'clients',
    component: ClientsOverviewComponent,
  },
  {
    path: '',
    component: HomeComponenet,
  },
];

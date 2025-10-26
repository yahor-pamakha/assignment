import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<header class="header">
      <h1>
        <img src="gerimedica-logo.png" alt="gerimedica logo" />
      </h1>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/clients">Clients</a>
      </nav>
    </header>
    <router-outlet /> `,
})
export class AppComponent {}

import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { Client } from '../../models/client.module';
import { ClientService } from '../../services/client.service';
import { ClientInfoModalComponent } from '../client-info-modal/client-info-modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients-overview.component.html',
  styleUrl: './clients-overview.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'isActive', 'id', 'actions'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.clientService.clients$
      .pipe(
        filter((clients) => !!clients.length),
        takeUntil(this.destroy$),
      )
      .subscribe((clients) => {
        this.dataSource.data = clients;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    switch (filterValue.trim().toLowerCase()) {
      case 'active':
        this.dataSource.filter = 'true';
        break;
      case 'inactive':
        this.dataSource.filter = 'false';
        break;
      default:
        this.dataSource.filter = filterValue.trim().toLowerCase();
        break;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openClientInfoModal(client?: Client) {
    this.dialog
      .open(ClientInfoModalComponent, {
        width: '400px',
        data: client,
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        take(1),
        switchMap((result) => {
          return result.isUpdate
            ? this.clientService.updateClient(result.client.id, result.client)
            : this.clientService.createClient(result.client);
        }),
      )
      .subscribe({
        next: () => {
          console.log('Client was successfully saved');
        },
        error: (err) => {
          console.error('Error saving client:', err);
        },
      });
  }

  onDelete(clientId: string): void {
    this.clientService
      .deleteClient(clientId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Client was successfully deleted');
        },
        error: (err) => {
          console.error('Error deleting client:', err);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../models/client.module';

@Component({
  selector: 'app-client-info-modal',
  templateUrl: './client-info-modal.component.html',
  styleUrl: './client-info-modal.component.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientInfoModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientInfoModalComponent>);
  private initialFormValues!: Partial<Client>;
  protected data: Client | null = inject(MAT_DIALOG_DATA, { optional: true });

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      birthDate: [this.data?.birthDate || null, Validators.required],
      isActive: [this.data?.isActive ?? false],
    });

    this.initialFormValues = this.userForm.value;
  }

  get hasChanges(): boolean {
    if (!this.userForm) {
      return false;
    }

    return JSON.stringify(this.initialFormValues) !== JSON.stringify(this.userForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const result = {
      client: {
        ...this.userForm.value,
        id: this.data?.id || crypto.randomUUID(),
      },
      isUpdate: !!this.data,
    };

    this.dialogRef.close(result);
  }
}

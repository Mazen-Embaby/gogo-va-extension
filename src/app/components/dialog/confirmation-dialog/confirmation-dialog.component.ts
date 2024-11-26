import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>, // This controls the dialog
    @Inject(MAT_DIALOG_DATA) public data: any, // This injects the data passed to the dialog
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // If user confirms, close dialog and return true
  }

  onCancel(): void {
    this.dialogRef.close(false); // If user cancels, close dialog and return false
  }
}

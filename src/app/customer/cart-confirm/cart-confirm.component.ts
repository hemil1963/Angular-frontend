import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-confirmation-dialog',
  templateUrl: './cart-confirm.component.html',
  standalone: true,
  styleUrl: './cart-confirm.component.css',
  imports: [
    MatDialogModule,
    MatButton,
    CommonModule
  ]
})
export class CartConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CartConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    
  }

  onConfirm() {
    this.dialogRef.close(true); // Passing true to indicate confirmation
  }

  onCancel() {
    this.dialogRef.close(false); // Passing false to indicate cancellation
  }
}

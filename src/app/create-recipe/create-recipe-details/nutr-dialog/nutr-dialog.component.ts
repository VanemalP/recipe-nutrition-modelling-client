import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from '../../../common/models/confirm-dialog';

@Component({
  selector: 'app-nutr-dialog',
  templateUrl: './nutr-dialog.component.html',
  styleUrls: ['./nutr-dialog.component.css']
})
export class NutrDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialog
  ) { }

  ngOnInit() {
    this.dialogRef.updatePosition({top: `25vh`});
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

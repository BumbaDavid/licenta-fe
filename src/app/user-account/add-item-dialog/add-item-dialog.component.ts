import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExportData} from "../../models/models";


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent  {
  public newItem: string = '';
  public isEdit = false;
  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category: string , currentEntry: string | undefined}
  ) {
    if(data.currentEntry) {
      this.isEdit = true;
    }
  }

  onSave() {
    let result: ExportData = {
      action: this.isEdit ? 'edit':'add',  // This could be 'add', 'edit', or 'delete' based on the operation
      data: {
        [this.data.category]: this.isEdit ? {
          oldValue: this.data.currentEntry,
          newValue: this.newItem,
        } :  [this.newItem]
      }
    };
    this.dialogRef.close(result);
  }

  onCancel() {
    this.dialogRef.close()
  }
}

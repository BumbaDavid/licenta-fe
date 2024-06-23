import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-cv-card',
  templateUrl: './user-cv-card.component.html',
  styleUrls: ['./user-cv-card.component.scss']
})
export class UserCvCardComponent implements OnInit {
  userCVData : any | undefined;
  constructor(
    public dialogRef: MatDialogRef<UserCvCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userCVData = data
  }

  ngOnInit(): void {
    console.log(this.userCVData)
  }
}

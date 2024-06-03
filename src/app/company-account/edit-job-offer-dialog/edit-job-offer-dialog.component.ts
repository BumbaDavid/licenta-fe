import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-job-offer-dialog',
  templateUrl: './edit-job-offer-dialog.component.html',
  styleUrls: ['./edit-job-offer-dialog.component.scss']
})
export class EditJobOfferDialogComponent implements OnInit {
  editJobOfferForm: FormGroup;
  initialFormValues: any;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditJobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.isEditMode = !!data;
    this.editJobOfferForm = this.fb.group({
      job_position: data?.job_position || '',
      job_category: data?.job_category || '',
      job_description: data?.job_description || '',
      location: data?.location || '',
      requirements: this.fb.array([]),
      salary: data?.salary || ''
    });
    this.setRequirements(data?.requirements || []);
    this.initialFormValues = this.editJobOfferForm.getRawValue();
  }

  ngOnInit(): void {
  }

  get requirements(): FormArray {
    return this.editJobOfferForm.get('requirements') as FormArray;
  }

  setRequirements(requirements: any): void {
    const formArray = this.requirements;
    if (Array.isArray(requirements)) {
      requirements.forEach(req => {
        formArray.push(this.fb.group({ requirement: req }));
      });
    } else {
      formArray.push(this.fb.group({ requirement: requirements }));
    }
  }

  addRequirement(): void {
    this.requirements.push(this.fb.group({ requirement: '' }));
  }

  removeRequirement(index: number): void {
    this.requirements.removeAt(index);
  }

  getChangedValues(): any {
    const currentValues = this.editJobOfferForm.getRawValue();
    const changedValues: any = {};

    for (const key in currentValues) {
      if (currentValues.hasOwnProperty(key) && JSON.stringify(currentValues[key]) !== JSON.stringify(this.initialFormValues[key])) {
        // Special handling for requirements
        if (key === 'requirements' && Array.isArray(currentValues[key])) {
          changedValues[key] = currentValues[key].map((req: any) => req.requirement); // assuming 'requirement' is the property containing the string
        } else {
          changedValues[key] = currentValues[key];
        }
      }
    }

    return changedValues;
  }

  onSave(): void {
    if (this.editJobOfferForm.valid) {
      const changedValues = this.getChangedValues();
      const result = this.isEditMode ? {
        id: this.data.id,
        changedValues: changedValues
      } : changedValues;
      this.dialogRef.close(result);
    }
  }


  onDiscard(): void {
    this.dialogRef.close();
  }
}

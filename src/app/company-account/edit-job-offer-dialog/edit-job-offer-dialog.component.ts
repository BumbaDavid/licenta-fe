import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-job-offer-dialog',
  templateUrl: './edit-job-offer-dialog.component.html',
  styleUrls: ['./edit-job-offer-dialog.component.scss']
})
export class EditJobOfferDialogComponent {
  editJobOfferFormFirst: FormGroup;
  editJobOfferFormSecond: FormGroup;
  editJobOfferFormThird: FormGroup;
  initialFormValues: any;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditJobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.isEditMode = !!data;
    this.editJobOfferFormFirst = this.fb.group({
      job_title: data?.job_title || '',
      job_position: data?.job_position || '',
      job_category: data?.job_category || '',
      job_description: data?.job_description || '',
    });
    this.editJobOfferFormSecond = this.fb.group({
      experience_level: data?.experience_level || '',
      job_type: data?.job_type || '',
      study_level: data?.study_level || '',
      location: data?.location || '',
      salary: data?.salary || ''
    });

    this.editJobOfferFormThird = this.fb.group({
      requirements: this.fb.array([]),
    })
    this.setRequirements(data?.requirements || []);

    this.initialFormValues = {
      ...this.editJobOfferFormFirst.getRawValue(),
      ...this.editJobOfferFormSecond.getRawValue(),
      ...this.editJobOfferFormThird.getRawValue()
    }
  }


  get requirements(): FormArray {
    return this.editJobOfferFormThird.get('requirements') as FormArray;
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
    const currentValues = {
      ...this.editJobOfferFormFirst.getRawValue(),
      ...this.editJobOfferFormSecond.getRawValue(),
      ...this.editJobOfferFormThird.getRawValue()
    }
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
    if (this.editJobOfferFormFirst.valid && this.editJobOfferFormSecond.valid && this.editJobOfferFormThird.valid) {
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

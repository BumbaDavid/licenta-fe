import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ExportData} from "../models/models";
import {AddItemDialogComponent} from "./add-item-dialog/add-item-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserCvService} from "../services/user-cv.service";

export enum Tab {
  PROFILE, CV, JOB_REQUESTS, CLOSE_ACCOUNT
}
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public tab = Tab;
  initialFormValues: any;
  profileForm: FormGroup;
  isEditing: boolean = false;
  cvCategories: any[] | undefined;

  openedTab: Tab | undefined;
  constructor(private authService: AuthService,
              private accountService: AccountService,
              private userCVService: UserCvService,
              private router: Router,
              private fb: FormBuilder,
              private dialog: MatDialog) {
    this.profileForm = this.fb.group({
      username: [{value: '', disabled: true}],
      first_name: [{value: '', disabled: true}],
      last_name: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      phone_number: [{value: '', disabled: true}],
      address: [{value: '', disabled: true}],
      date_joined: [{value: '', disabled: true}],
      age: [{value: '', disabled: true}],
    })
  }

  ngOnInit(): void {
    const lastTab = localStorage.getItem('lastOpenedTab')
    this.openedTab = lastTab ? Number(lastTab) : Tab.PROFILE;
    this.getUserData();
  }

  changeTab(newTab: Tab) {
      this.openedTab = newTab;
      localStorage.setItem('lastOpenedTab', newTab.toString());
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('api_key');
      this.router.navigate(['/homepage']).then(() => {
        console.log('logout successful')
      })
    })
  }

  getUserData(): void {
    this.accountService.getUserData().subscribe({
     next: data =>
    {
      this.profileForm.patchValue({
        username: data?.username,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        phone_number: data?.user?.phone_number,
        address: data?.user?.address,
        date_joined: data?.date_joined,
        age: data?.user?.age
      })
      this.initialFormValues = this.profileForm.getRawValue();
      this.updateUserCVCategories(data)

      console.log(this.cvCategories)
      console.log(this.initialFormValues)
    },
     error: error => console.error('error fetching data', error)
  });
  }

  hasChanges(): boolean {
    const currentFormValues = this.profileForm.getRawValue();
    return JSON.stringify(this.initialFormValues) !== JSON.stringify(currentFormValues);
  }

  editProfile() {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get('date_joined')?.disable();
  }

  getModifiedFields(): any {
    const currentFormValues = this.profileForm.getRawValue();
    const modifiedFields: any = {};

    Object.keys(currentFormValues).forEach(key=> {
      if(currentFormValues[key] != this.initialFormValues[key]) {
        modifiedFields[key] = currentFormValues[key];
      }
    });
    return modifiedFields;
  }

  updateProfile() {
    if(this.profileForm.valid && this.hasChanges()) {
      const modifiedData = this.getModifiedFields()
      this.accountService.updateUserData(modifiedData).subscribe({
        next: data => {
          this.profileForm.patchValue(data);
          this.isEditing = false;
          this.profileForm.disable();
          this.initialFormValues = this.profileForm.getRawValue();
        },
        error: error => console.error("error updating data", error)
      });
    }
  }

  addNewEntryToCVProfileField(category: string, currentEntry?: string): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '300px',
      data: { category: category, currentEntry: currentEntry }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.userCVService.updateUserCV(result).subscribe({
          next: data => {
            this.updateUserCVCategories(data)
            this.getUserData()
          },
          error: error => console.error("error updating data", error)
        });
      }
    });
  }

  deleteItem(categoryEntry: string, categoryTitle: string): void {
    let entryToDelete: ExportData = {
      action: 'delete',
      data: {
        [categoryTitle] : [categoryEntry]
      }
    }
    if(entryToDelete) {
      this.userCVService.deleteCVEntry(entryToDelete).subscribe({
        next: data => {
          this.updateUserCVCategories(data)
          this.getUserData()
        },
        error: error => console.error("error updating data", error)
      });
    }
  }

  updateUserCVCategories(data: any) {
    if(data?.user_cv && typeof data.user_cv === 'object'){
      this.cvCategories = Object.keys(data.user_cv).map(key => ({
        title:key,
        items: data.user_cv[key]
      }));
    }
    console.log(this.cvCategories)
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ExportData} from "../models/models";
import {AddItemDialogComponent} from "./add-item-dialog/add-item-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserCvService} from "../services/user-cv.service";
import {JobOffersService} from "../services/job-offers.service";
import {UserCvCardComponent} from "../user-cv-card/user-cv-card.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {ChatbotService} from "../services/chatbot.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export enum Tab {
  PROFILE, CV, JOB_REQUESTS, CLOSE_ACCOUNT, JOB_ASSISTANT
}

export enum JobAssistant {
  CHOICE, CV, TEXT, RECOMMENDATIONS
}
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public tab = Tab;
  public assistantTab = JobAssistant;
  userId : any;

  textQuery: string = "";
  initialFormValues: any;
  profileForm: FormGroup;
  isEditing: boolean = false;
  cvCategories: any[] | undefined;
  appliedJobs: any[] | undefined;
  recommendations: any[] | undefined;

  objectToSend = {};

  openedTab: Tab | undefined;
  openedAssistantTab: JobAssistant | undefined;

  constructor(private authService: AuthService,
              private accountService: AccountService,
              private userCVService: UserCvService,
              private jobOfferService: JobOffersService,
              private chatBotService: ChatbotService,
              private _snackBar: MatSnackBar,
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
    this.getAppliedJobs();
    this.openedAssistantTab = JobAssistant.CHOICE;
  }

  changeTab(newTab: Tab) {
      this.openedTab = newTab;
      localStorage.setItem('lastOpenedTab', newTab.toString());
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('api_key');
      localStorage.removeItem('username')
      localStorage.removeItem('lastOpenedTab')
      this.router.navigate(['/homepage']).then(() => {
        window.location.reload()
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
      this.userId = data?.user_id
      this.initialFormValues = this.profileForm.getRawValue();
      this.updateUserCVCategories(data)
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

          this._snackBar.open("Profile updated successfully", 'Cancel', {
            duration: 3000,
          })
        },
        error: () => {
          this._snackBar.open("Error trying to update profile", 'Cancel', {
            duration: 3000,
          })
        }
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

            this._snackBar.open("New entry added to CV", 'Cancel', {
              duration: 3000,
            })
          },
          error: () => {
            this._snackBar.open("Error trying to add new entry", 'Cancel', {
              duration: 3000,
            })
          }
        });
      }
    });
  }

  deleteItem(categoryEntry: string, categoryTitle: string): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        categoryTitle,
        categoryEntry,
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this entry?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let entryToDelete: ExportData = {
          action: 'delete',
          data: {
            [categoryTitle] : [categoryEntry],
          }
        }
        if(entryToDelete) {
          this.userCVService.deleteCVEntry(entryToDelete).subscribe({
            next: data => {
              this.updateUserCVCategories(data)
              this.getUserData()
              this._snackBar.open("CV entry deleted successfully", 'Cancel', {
                duration: 3000,
              })
            },
            error: () => {
              this._snackBar.open("Error trying to delete CV entry", 'Cancel', {
                duration: 3000,
              })
            }
          });
        }
      }
    })
  }

  updateUserCVCategories(data: any) {
    if(data?.user_cv && typeof data.user_cv === 'object'){
      this.cvCategories = Object.keys(data.user_cv).map(key => ({
        title:key,
        items: data.user_cv[key]
      }));
    }
  }

  getAppliedJobs() {
    this.jobOfferService.getAppliedJobs().subscribe( {
      next: data =>{
        this.appliedJobs = data?.objects;
        console.log("applied jobs :", this.appliedJobs)
    },
      error: error => console.error("error fetching applied jobs, ", error)
    })
  }

  cancelApplication(jobId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Cancellation',
        message: 'Are you sure you want to cancel your job application?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.jobOfferService.cancelApplication(jobId).subscribe({
          next: () => {
            this.getAppliedJobs();
            this._snackBar.open("Canceled job application", 'Cancel', {
              duration: 3000,
            })
          },
          error: () => {
            this._snackBar.open("Error while trying to cancel job application", 'Cancel', {
              duration: 3000,
            })
          }
        })
      }
    })
  }

  openCV() {
    const userCVData = {
      ...this.initialFormValues,
      'categories': {
        ...this.cvCategories
      }
    };
    this.dialog.open(UserCvCardComponent, {
      width: '700px',
      data: userCVData
    })
  }

  onUserSelect(choice: JobAssistant) {
    if(choice === JobAssistant.CV) {
      this.openedAssistantTab = choice;

    } else if(choice === JobAssistant.TEXT) {
      this.openedAssistantTab = choice;
    }
  }

  searchForJobs() {
    if(this.openedAssistantTab !== this.assistantTab.TEXT){
      this.objectToSend = {
        "response": "yes"
      }
    } else if(this.openedAssistantTab === this.assistantTab.TEXT){
      this.objectToSend = {
        "response": "no",
        "text_input": this.textQuery
      }
    }
    this.chatBotService.geJobRecommendations(this.objectToSend).subscribe({
      next: (response) => {
        if(response.status === 200) {
          this.recommendations = response.body?.jobs
          this.openedAssistantTab = this.assistantTab.RECOMMENDATIONS
        }
      },
      error: () => {
        this._snackBar.open("Error while trying to fetch job recommendations", 'Cancel', {
          duration: 3000,
        })
      }
    })

  }

  closeAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Cancellation',
        message: 'Are you sure you want to cancel your job application?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       this.accountService.deleteUser(this.userId).subscribe({
           next: () => {
             localStorage.clear()
             this.router.navigate(['/homepage']).then(() => {
               window.location.reload()
             })
             this._snackBar.open("Account closed successfully", 'Cancel', {
               duration: 3000,
             })
           },
         error: () => {
           this._snackBar.open("Error while trying to close account", 'Cancel', {
             duration: 3000,
           })
         }
         }
       )
      }
    })
  }
}

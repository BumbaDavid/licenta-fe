import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {JobOffersService} from "../services/job-offers.service";
import {map, Observable, of, switchMap} from "rxjs";
import {EditJobOfferDialogComponent} from "./edit-job-offer-dialog/edit-job-offer-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export enum Tab {
  PROFILE, JOBS_OFFERS, JOB_OFFER_CREATION, CLOSE_ACCOUNT
}
@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.scss']
})
export class CompanyAccountComponent implements OnInit {
  public tab = Tab;
  openedTab: Tab | undefined;
  companyDetailsForm: FormGroup;
  initialFormValues: any;
  isEditing: boolean = false;
  _username : string | undefined;
  jobOffersData: any | undefined;

  constructor(private authService: AuthService,
              private accountService: AccountService,
              private jobOffersService: JobOffersService,
              private dialog: MatDialog,
              private router: Router,
              private fb: FormBuilder) {
    this.companyDetailsForm = this.fb.group({
      username: [{value: '', disabled: true}],
      company_name: [{value: '', disabled: true}],
      description: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
      contact_email: [{value: '', disabled: true}],
      date_joined: [{value: '', disabled: true}],
    })
  }

  ngOnInit(): void {
    const lastTab = localStorage.getItem('lastOpenedTab')
    this.openedTab = lastTab ? Number(lastTab) : Tab.PROFILE;
    this.loadData();
  }

  loadData() {
    this.getCompanyDetails().pipe(
      switchMap(() => {
        if (this._username) {
          return this.getJobOffers()
        } else {
          throw  new Error("Username not loaded yet")
        }
      })
    ).subscribe({
      next: jobOffers => {
        this.jobOffersData = jobOffers?.objects
        console.log('job offers : ', jobOffers?.objects)
      },
      error: error => console.log('error loading data', error)
    })
  }

  changeTab(newTab: Tab) {
    this.openedTab = newTab;
    localStorage.setItem('lastOpenedTab', newTab.toString())
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('api_key');
      this.router.navigate(['/homepage']).then(() => {
        console.log('logout successful')
      })
    })
  }

  getCompanyDetails(): Observable<void> {
    return this.accountService.getUserData().pipe(
      map(data =>
      {
        this.companyDetailsForm.patchValue({
          username: data?.username,
          company_name: data?.company_profile?.company_name,
          email: data?.email,
          phone: data?.company_profile?.phone,
          contact_email: data?.company_profile?.email,
          description: data?.company_profile?.description,
          date_joined: data?.date_joined,
        })
        this.initialFormValues = this.companyDetailsForm.getRawValue();
        this._username = this.initialFormValues?.username
        console.log(this._username)
        console.log(this.initialFormValues)
      })
    )
  }

  hasChanges() {
    const currentFormValues = this.companyDetailsForm.getRawValue();
    return JSON.stringify(this.initialFormValues) !== JSON.stringify(currentFormValues);

  }

  getModifiedFields(): any {
    const currentFormValues = this.companyDetailsForm.getRawValue();
    const modifiedFields: any = {};

    Object.keys(currentFormValues).forEach(key=> {
      if(currentFormValues[key] != this.initialFormValues[key]) {
        modifiedFields[key] = currentFormValues[key];
      }
    });
    return modifiedFields;
  }

  editProfile() {
    this.isEditing = true;
    this.companyDetailsForm.enable();
    this.companyDetailsForm.get('date_joined')?.disable();
  }

  updateProfile(){
    if (this.companyDetailsForm.valid && this.hasChanges()) {
      const modifiedData = this.getModifiedFields()
      this.accountService.updateUserData(modifiedData).subscribe({
        next: data => {
          this.companyDetailsForm.patchValue(data);
          this.isEditing = false;
          this.companyDetailsForm.disable();
          this.initialFormValues = this.companyDetailsForm.getRawValue();
          this._username = this.initialFormValues?.username
          console.log(this._username)
        },
        error: error => console.error("error updating companny profile", error)
      })
    }
  }

//   JOB OFFERS
  getJobOffers(): Observable<any> {
    if(this._username){
      return this.jobOffersService.getUserJobOffers(this._username)
    } else {
      return of()
    }
  }

  editJobOffer(jobOffer: any): void {
    const dialogRef = this.dialog.open(EditJobOfferDialogComponent, {
      width: '1000px',
      data: jobOffer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.jobOffersService.updateJobOffer(this._username || "" , result).subscribe({
          next: () => {
            this.loadData()
          },
          error: error => console.error('error fetching data', error)
        })
      }
    });
  }

  seeJobOffer(jobOffer: any): void {

  }

  createJobOffer(): void {
    const dialogRef = this.dialog.open(EditJobOfferDialogComponent, {
      width: '1500px',
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        console.log(result)
        // this.jobOffersService.createJobOffer(this._username || '', result).subscribe({
        //   next: () => {
        //     this.loadData()
        //   },
        //   error: error => console.error("error creating new job offer", error)
        // })
      }
    })
  }

}

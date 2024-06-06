import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from "./modules/material.module";
import { HomepageComponent } from './homepage/homepage.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import { AddItemDialogComponent } from './user-account/add-item-dialog/add-item-dialog.component';
import { CompanyAccountComponent } from './company-account/company-account.component';
import { EditJobOfferDialogComponent } from './company-account/edit-job-offer-dialog/edit-job-offer-dialog.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SearchJobsComponent,
    JobDetailsComponent,
    UserAccountComponent,
    AddItemDialogComponent,
    CompanyAccountComponent,
    EditJobOfferDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RouterModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

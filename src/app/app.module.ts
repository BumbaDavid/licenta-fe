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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SearchJobsComponent,
    JobDetailsComponent,
    UserAccountComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

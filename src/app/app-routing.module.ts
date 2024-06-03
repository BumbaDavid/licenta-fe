import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SearchJobsComponent} from "./search-jobs/search-jobs.component";
import {JobDetailsComponent} from "./job-details/job-details.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {AuthGuard} from "./guards/auth.guard";
import {CompanyAccountComponent} from "./company-account/company-account.component";

const routes: Routes = [
  { path : 'login', component: LoginComponent},
  { path : 'homepage', component: HomepageComponent},
  { path : 'search-jobs', component: SearchJobsComponent},
  { path : 'job-details/:id', component: JobDetailsComponent},
  { path : 'account', component: UserAccountComponent, canActivate: [AuthGuard]},
  { path : 'company-account', component: CompanyAccountComponent, canActivate: [AuthGuard]},
  { path : '', redirectTo: '/homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Component, OnInit, HostListener, ViewEncapsulation} from '@angular/core';
import {homepageJobCategories, JobCategory, PromotedJob, promotedJobs} from "../models/mock-data-models";
import {AuthService} from "../services/auth.service";
import {JobOffersService} from "../services/job-offers.service";
import {job_category, job_position} from "../models/filter-models";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  categories: JobCategory[] = homepageJobCategories;
  promotedJobs: PromotedJob[] = promotedJobs;

  nrJoburiDisponibile: any;
  nrDepartamente: any;
  public industrii = job_category[4];
  public departament = job_position;

  constructor(private authService: AuthService, private jobService: JobOffersService) {
    this.nrDepartamente = this.departament.length;
  }
  ngOnInit(): void {
    this.fetchAllJobs()
  }

  fetchAllJobs() {
    let jobLimit = 8
    this.jobService.getAllJobs(jobLimit).subscribe({
      next: (jobs) => {
        this.nrJoburiDisponibile = jobs.meta.total_count
      }
    })
  }
}

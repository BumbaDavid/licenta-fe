import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobOffersService} from "../services/job-offers.service";
import {ExperienceLevelMapping, JobTypeMapping, StudyLevelMapping} from "../models/models";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobOffer: any;
  jobId : any;
  jobType: any;
  studyLevel: any;
  experienceLevel: any;
  constructor(
    private route: ActivatedRoute,
    private jobOffersService: JobOffersService
  ) { }

  ngOnInit(): void {
     this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobOffersService.getJobOfferById(this.jobId).subscribe({
        next: data => {
          this.jobType = data?.job_type ?  JobTypeMapping[data?.job_type] : "Unknown Job Type";
          this.studyLevel = data?.study_level ? StudyLevelMapping[data?.study_level] : "Unkown Study Level";
          this.experienceLevel = data?.experience_level ? ExperienceLevelMapping[data?.experience_level] : " Unkown Experience Level";

          this.jobOffer = data;
          console.log(this.jobOffer)
        },
        error: error => console.error("error retrieving job offer", error)
      })
    }
  }

  applyForJob() {
    this.jobOffersService.applyForJob(this.jobId).subscribe({
      next: (response: any) => {
        console.log('Application succesful:', response)
      },
      error: (error: any) =>
        console.error('error applying :', error)
    })
  }
}

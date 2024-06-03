import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobOffersService} from "../services/job-offers.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobOffer: any;
  jobId : any;
  constructor(
    private route: ActivatedRoute,
    private jobOffersService: JobOffersService
  ) { }

  ngOnInit(): void {
     this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobOffersService.getJobOfferById(this.jobId).subscribe({
        next: data => {
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

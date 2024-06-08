import { Component, OnInit } from '@angular/core';
import {JobOffersService} from "../services/job-offers.service";
import {Filter, JobCards} from "../models/models";
import {cities, experienceLevel, jobType, studyLevel} from "../models/filter-models";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit{
  searchQuery: string = '';
  jobs: JobCards[] = [];
  public cities: Filter[] = cities;
  public jobTypes: Filter[] = jobType;
  public experienceLevel: Filter[] = experienceLevel;
  public studyLevel: Filter[] = studyLevel;
  selectedTypes: { [key: string]: boolean } = {};
  filterText = '';


  constructor(private jobService: JobOffersService) { }

  ngOnInit() {
    this.getAllJobs()
  }

  searchJobs() {
    console.log('Searching for:', this.searchQuery);
    // Implement your search logic here
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data.objects.map((job: any) => ({
          job_title: job.job_position,
          job_description: this.truncateDescription(job.job_description),
          job_location: job.location,
          company_name: job.company.company_name
        }))

      },
      error: error => console.error(error)
    })
  }

  truncateDescription(description: string): string {
    const limit = 30;
    let spaceCount = 0;

    for (let i = 0; i < description.length; i++) {
      if(description[i] === ' ') spaceCount++;
      if(spaceCount === limit) {
        return description.slice(0, i) + ' ...';
      }
    }
    return description;
  }

  onChange(type: string, isChecked: boolean) {
    this.selectedTypes[type] = isChecked; // Update selection state based on checkbox
    console.log(`Checkbox for ${type} changed to ${isChecked}`);
    console.log(this.selectedTypes)
  }

  onCityChange(city: string, isChecked: boolean) {
    this.selectedTypes[city] = isChecked;
  }
}

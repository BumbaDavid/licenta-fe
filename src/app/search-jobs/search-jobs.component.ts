import { Component, OnInit } from '@angular/core';
import {JobOffersService} from "../services/job-offers.service";
import {Filter, JobCards} from "../models/models";
import {cities, experience_level, job_category, job_position, job_type, study_level} from "../models/filter-models";
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit{
  searchQuery: string = '';
  jobs: JobCards[] = [];

  public cities: Filter[] = cities;
  public jobTypes: Filter[] = job_type;
  public experience_level: Filter[] = experience_level;
  public study_level: Filter[] = study_level;
  public job_category: Filter[] = job_category;
  public job_position: Filter[] = job_position;

  filterTextCities = '';
  filterTextDepartment = '';
  filtertextIndustry = '';

  nextPage: any = null;
  previousPage: any = null;
  currentPage= 1;
  totalPages = 0;
  pageLimit : any;

  public allFilters: {[key:string] : Filter[]} = {
    job_type: [],
    location: [],
    job_position: [],
    job_category: [],
    study_level: [],
    experience_level: []
  }
  constructor(private jobService: JobOffersService,
              private router: Router,
              private viewportScroller: ViewportScroller) { }

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
        console.log(data)
        if(data.meta){
          this.pageLimit = data.meta.limit;
          this.nextPage = data.meta?.next;
          this.previousPage = data.meta?.previous;
          this.updateTotalPages(data.meta.total_count)
        }
        this.jobs = data.objects.map((job: any) => ({
          id: job.id,
          job_title: job.job_position,
          job_description: this.truncateDescription(job.job_description),
          job_location: job.location,
          company_name: job.company.company_name
        }))
        console.log(this.jobs)
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

  onFilterChange(filter: Filter, isChecked: boolean) {
    if (isChecked) {
      this.allFilters[filter.category].push(filter)
    } else {
      this.allFilters[filter.category] = this.allFilters[filter.category].filter(f => f.query !== filter.query)
    }
    this.fetchFilteredJobs();
  }

  buildQueryParams(): string {
    const params = [];
    for (const category in this.allFilters) {
      if (this.allFilters[category].length > 0) {
        if (this.allFilters[category].length === 1) {
          // When there's only one filter, use `__icontains`
          const query = this.allFilters[category].map(f => f.query).join('');
          params.push(`${category}__icontains=${query}`);
        } else {
          // When there are two or more filters, use `__in`
          const queries = this.allFilters[category].map(f => encodeURIComponent(f.query)).join(',');
          params.push(`${category}__in=${queries}`);
        }
      }
    }
    return params.join('&');
  }


  fetchFilteredJobs(offset?: any) {
    const queryParams = this.buildQueryParams();
    const queryParamsOffset = queryParams.concat(`offset=${offset}`)

    this.jobService.getFilteredJobs(offset ? queryParamsOffset : queryParams).subscribe({
      next: filteredJobs => {
        if(filteredJobs.meta){
          this.pageLimit = filteredJobs.meta.limit;
          this.nextPage = filteredJobs.meta?.next;
          this.previousPage = filteredJobs.meta?.previous;
          this.updateTotalPages(filteredJobs.meta.total_count)
        }
        this.jobs = filteredJobs.objects.map((fObj : any) => ({
            id: fObj.id,
          job_title: fObj.job_position,
          job_description: this.truncateDescription(fObj.job_description),
          job_location: fObj.location,
          company_name: fObj.company.company_name
        })
        )},
      error: error => console.error("Error fetching filtered data", error)
    });
    console.log(this.jobs)
  }

  updateTotalPages(totalCount: number) {
    this.totalPages = Math.ceil(totalCount / this.pageLimit)
  }

  goToPage(page: number) {
    const offset = (page-1) * this.pageLimit;
    this.currentPage = page;
    this.fetchFilteredJobs(offset)
    this.viewportScroller.scrollToPosition([0,0])
  }

  navigateToJob(jobId: any) {
    this.router.navigate(['/job-details',jobId]).then(() =>console.log("successfully sent user to job offer page"))
  }
}

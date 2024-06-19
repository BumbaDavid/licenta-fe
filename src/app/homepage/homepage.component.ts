import {Component, OnInit} from '@angular/core';
import {homepageJobCategories, JobCategory, PromotedJob, promotedJobs} from "../models/mock-data-models";
import {AuthService} from "../services/auth.service";
import {JobOffersService} from "../services/job-offers.service";
import {job_category, job_position} from "../models/filter-models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  categories: JobCategory[] = homepageJobCategories;
  promotedJobs: PromotedJob[] = promotedJobs;

  jobOffers: any |undefined;
  randomJobCategories: any | undefined;
  randomJobLocations: any | undefined;
  nrJoburiDisponibile: any;
  nrDepartamente: any;
  randomJobs: any | undefined;
  public industrii = job_category[4];
  public departament = job_position;

  constructor(private authService: AuthService,
              private router: Router,
              private jobService: JobOffersService) {
    this.nrDepartamente = this.departament.length;
  }
  ngOnInit(): void {
    this.fetchAllJobs()
    this.fetchRandomJobs()
  }

  fetchAllJobs() {
    let limit=80
    this.jobService.getAllJobs(limit).subscribe({
      next: (jobs) => {
        console.log(jobs)
        this.jobOffers = jobs.objects
        this.randomJobCategories = this.getRandomAttributeWithJobs('job_category')
        this.randomJobLocations = this.getRandomAttributeWithJobs('location')
        console.log(this.randomJobCategories)
        this.nrJoburiDisponibile = jobs.meta.total_count
      }
    })
  }

  fetchRandomJobs() {
    this.jobService.getRandomJobs().subscribe({
      next: (jobs) => {
        this.randomJobs = jobs?.objects
        console.log(this.randomJobs)
      },
      error: error => console.error("error fetching random jobs: ", error)
    })
  }

  getRandomAttributeWithJobs(attribute: 'job_category' | 'location') {
     const uniqueAttributes = Array.from(new Set(this.jobOffers.map((job: any) => job[attribute])))

    this.shuffleArray(uniqueAttributes);
    const selectedAttributes = uniqueAttributes.slice(0, 4);

    return selectedAttributes.map((attr: any) => {
      const jobsInAttribute = this.jobOffers.filter((job: any) => job[attribute] === attr);
      const uniquePositions = Array.from(new Set(jobsInAttribute.map((job: any) => job?.job_position)))
      this.shuffleArray(uniquePositions)
      const selectedPositions = uniquePositions.slice(0, 4)

      return {
        name: attr,
        jobs: selectedPositions,
      }
    })
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  onCardClick(categoryName: string) {
    this.router.navigate(['/search-jobs'], { queryParams: { category: categoryName } }).then(()=>
      console.log("routed succesfully")
    );
  }

  onLocationCardClick(locationName: string) {
    this.router.navigate(['/search-jobs'], { queryParams: { location: locationName } }).then(()=>
      console.log("routed succesfully"));
  }
}

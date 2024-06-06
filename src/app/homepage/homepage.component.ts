import {Component, OnInit, HostListener, ViewEncapsulation} from '@angular/core';
import {homepageJobCategories, JobCategory, PromotedJob, promotedJobs} from "../models/mock-data-models";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isScrolled = false;
  categories: JobCategory[] = homepageJobCategories;
  promotedJobs: PromotedJob[] = promotedJobs;
  isLoggedin: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('api_key')){
      this.isLoggedin = true
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollOffset = window.scrollY;
    this.isScrolled = scrollOffset > 10;
  }

}

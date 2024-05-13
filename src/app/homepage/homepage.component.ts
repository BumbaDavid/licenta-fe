import { Component, OnInit, HostListener } from '@angular/core';
import {homepageJobCategories, JobCategory, PromotedJob, promotedJobs} from "../models/mock-data-models";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  isScrolled = false;
  categories: JobCategory[] = homepageJobCategories;
  promotedJobs: PromotedJob[] = promotedJobs;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollOffset = window.scrollY;
    this.isScrolled = scrollOffset > 10;
  }
}

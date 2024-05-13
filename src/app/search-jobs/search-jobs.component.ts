import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent {
  searchQuery: string = '';
  jobs = [
    { title: 'Open Order Management responsible - German Speaker', company: 'Avantor', location: 'Bucharest', description: 'Detailed job description...', tags: ['VIDEO'], externalApply: true },
    { title: 'Soferi basculanta', company: 'GP Papenburg', location: 'Unknown', description: '1800 - 2500 EUR net / lună', tags: [], externalApply: false },
    { title: 'Agent de Vanzari', company: 'Euro Team GB Spedition', location: 'Alba Iulia', description: 'Detailed job description...', tags: [], externalApply: false }
  ];
  constructor() { }
  searchJobs() {
    console.log('Searching for:', this.searchQuery);
    // Implement your search logic here
  }

}

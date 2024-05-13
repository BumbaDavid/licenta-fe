// Create an interface for Job Category
export interface JobCategory {
  name: string;
  image: string;
  jobs: string[];
}

// Sample data
export const homepageJobCategories: JobCategory[] = [
  {
    name: 'Transporturi',
    image: 'assets/transport.jpg',  // replace with your images
    jobs: ['Șofer', 'Curier', 'Livrator', 'Dispecer', 'Distribuție']
  },
  {
    name: 'IT',
    image: 'assets/it.jpg',
    jobs: ['Graphic designer', 'Operator calculator', 'Software engineer', 'Web developer', 'Game tester']
  },
  {
    name: 'IT',
    image: 'assets/it.jpg',
    jobs: ['Graphic designer', 'Operator calculator', 'Software engineer', 'Web developer', 'Game tester']
  },
  {
    name: 'IT',
    image: 'assets/it.jpg',
    jobs: ['Graphic designer', 'Operator calculator', 'Software engineer', 'Web developer', 'Game tester']
  },
];

export interface PromotedJob {
  date: string;
  logo: string;
  title: string;
  company: string;
}

export const promotedJobs: PromotedJob[] = [
  {
    date: '2024-05-10',
    logo: 'assets/pwc-logo.png', // Replace with your actual logo image paths
    title: 'Developing Senior Auditor - no experience required',
    company: 'PricewaterhouseCoopers Audit S.R.L.'
  },
  {
    date: '2024-05-10',
    logo: 'assets/fan-courier-logo.png',
    title: 'Magaziner FAN Courier - Stefanestii de Jos',
    company: 'FAN Courier Express SRL'
  },
  {
    date: '2024-05-10',
    logo: 'assets/lensa-logo.png',
    title: 'Optometrist - București',
    company: 'Lensa'
  },
  {
    date: '2024-05-10',
    logo: 'assets/sphera-logo.png',
    title: 'Senior Reporting Analyst',
    company: 'SPHERA FRANCHISE GROUP SA'
  },
  {
    date: '2024-05-10',
    logo: 'assets/synevo-logo.png',
    title: 'Receptionist/a centru recoltare/Asistent medical...',
    company: 'SYNEVO ROMANIA SRL'
  },
  {
    date: '2024-05-10',
    logo: 'assets/schrack-logo.png',
    title: 'Magazioner in Bacau',
    company: 'SCHRACK TECHNIK SRL'
  },
  {
    date: '2024-05-10',
    logo: 'assets/bilka-logo.png',
    title: 'Mecanic intretinere utilaj - BRASOV',
    company: 'Bilka Steel'
  },
  {
    date: '2024-05-10',
    logo: 'assets/schrack-logo.png',
    title: 'INGINER SUPORT TEHNIC si VANZARI ONLINE in Bucuresti',
    company: 'SCHRACK TECHNIK SRL'
  }
];

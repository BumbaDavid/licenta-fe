export interface UserLogin {
  account_type: string;
  username: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  email: string;
  groups: string[];
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
}

export interface UserProfile {
  user: UserLogin;
  address: string;
  gender: string;
  phone_number: string;
  date_of_birth: string;
}

export interface UserCV {
  user_profile: UserProfile;
  studies: string;
  experience: string;
  abilities: string;
  languages: string;
  hobbies: string;
}

export interface JobOffers {
  job_description: string;
  salary: number;
  requirements: string;
  location: string;
  job_position: string;
  job_category: string;
}

export interface CompanyDetails {
  user: UserLogin;
  company_name: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  job_offers: JobOffers[];
}

export interface CVCategories {
  studies: string[];
  experience: string[];
  abilities: string[];
  languages: string[];
  hobbies: string[];
}

export interface ExportData {
  action: string;
  data:{
    [key : string] : string[] | { oldValue: string | undefined, newValue: string | undefined };
  };
}

export interface RegistrationData {
  username: string;
  password: string;
  account_type: string;
  email: string;
  first_name?: string;  // Optional property
  last_name?: string;   // Optional property
}

export interface JobCards {
  id: string;
  job_title: string;
  job_description: string;
  job_location: string;
  company_name: string;
}

export interface Filter {
  name: string,
  category: string,
  query: string,
}

export const JobTypeMapping: { [key: string]: string } = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  "internship": "Internship",
  "voluntariat": "Voluntariat",
  "proiect": "Proiect",
  "sezonier": "Sezonier"
};

export const StudyLevelMapping:  {[key: string]: string }  = {
"necalificat" : "Necalificat",
"calificat" : "Calificat",
"student" : "Student",
"absolvent" : "Absolvent",
}

export const ExperienceLevelMapping: {[key: string]: string } = {
  "fara-experienta" : "Fara experienta",
  "entry-level" : "Entry Level (< 2 ani)",
  "senior" :  "Senior level(>= 5 ani)",
  "manager" : "Manager",
  "executiv" : "Executiv",
}

export const JobCategories: string[] = [
  "Management",
  "Analiza",
  "Business",
  "IT",
  "DevOps",
  "Software Development",
  "Mobile Development",
  "Design",
  "Quality Assurance",
  "Securitate",
  "Inteligență Artificială",
  "Data Science",
  "Consultana",
  "Agricultura",
  "Ecologie",
  "Inginerie",
  "Consultanta",
  "Marketing",
  "Digital",
  "Logistica",
  "Aprovizionare",
  "Suport",
  "Relatii Clienti",
  "Cercetare",
  "Tehnologie",
  "Educatie",
  "Dezvoltare Continut",
  "Evaluare",
  "Formare",
  "Consiliere",
  "Consultanta",
  "Afaceri",
  "Finante",
  "Strategie",
  "Servicii pentru Clienti",
  "Retail",
  "Investitii",
  "Merchandising"
];

export const JobPositions: string[] = [
  "Manager",
  "Analist Business",
  "Specialist DevOps",
  "Dezvoltator Software",
  "Dezvltator iOS",
  "Dezvoltator Android",
  "UX/UI Designer",
  "QA Engineer",
  "Analist",
  "Inginer",
  "Data Scientist",
  "Specialist NLP",
  "Consultant",
  "Coordonator",
  "Dezvoltator",
  "Trainer",
  "Reprezentant"
];

export const JobTypes: string[] = [
  "full-time",
  "part-time",
  "internship",
  "voluntariat",
  "proiect",
  "sezonier",
];

export const StudyLevels: string[] = [
  "Necalificat",
  "Calificat",
  "Student",
  "Absolvent"
];

export const ExperienceLevels: string[] = [
  "fara-experienta",
  "entry-level",
  "senior",
  "manager",
  "executiv"
];

export interface LoginData {
  api_key?: string,
  username?: string,
  account_type?: string
}

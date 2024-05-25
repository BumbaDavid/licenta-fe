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
  job_posiion: string;
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

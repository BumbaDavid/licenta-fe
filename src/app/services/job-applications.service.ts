import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {handleError} from "../../handle-error";

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {

  jobApplicationsUrl = 'http://localhost:8000/api/v1/jobApplication/get-apps-company/'
  constructor(private http: HttpClient) { }

  getAllJobApplications(): Observable<any> {
    const username = localStorage.getItem('username')
    const api_key = localStorage.getItem('api_key')
    const headers = new HttpHeaders({
      'Authorization': `ApiKey ${username}:${api_key}`
    })

    return this.http.get<any>(this.jobApplicationsUrl, {headers}).pipe(
      catchError(handleError('getAllJobApplications'))
    )
  }
}

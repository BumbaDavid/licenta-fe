import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {handleError} from "../../handle-error";

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {

  private jobOffersUrl = 'http://127.0.0.1:8000/api/v1/jobOffers/'

  constructor(private http: HttpClient) { }

  createJobOffer(username: string, data: any): Observable<any>{
    const apiKey = localStorage.getItem('api_key')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      return this.http.post<any>(this.jobOffersUrl, data, {headers}).pipe(
        catchError(handleError<any>('createJobOffer'))
      )
    } else {
      return of()
    }
  }

  getUserJobOffers(username: string, filter?: any): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      return this.http.get<any>(this.jobOffersUrl,{headers}).pipe(
        catchError(handleError<any>('getUserJobOffers'))
      )
    } else {
      return of()
    }
  }

  updateJobOffer(username: string, data: any): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    if(apiKey) {
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      console.log("job service data", data)
      return this.http.patch<any>(`${this.jobOffersUrl}${data?.id}/`, data, {headers}).pipe(
        catchError(handleError<any>('updateJobOffer'))
      )
    } else {
      return of()
    }
  }

  getJobOfferById(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.jobOffersUrl}${jobId}/?all=true&bypass_auth=true`).pipe(
      catchError(handleError<any>('getJobOfferById'))
    )
  }

  applyForJob(jobId: any): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    const username = localStorage.getItem('username')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      return this.http.post<any>(`${this.jobOffersUrl}${jobId}/apply/`,{}, {headers}).pipe(
        catchError(handleError<any>('applyForJob'))
      )
    } else {
      return of()
    }
  }

  getAppliedJobs(): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    const username = localStorage.getItem('username')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      return this.http.get<any>(`${this.jobOffersUrl}applied/`, {headers}).pipe(
        catchError(handleError<any>('getAppliedJobs'))
      )
    } else {
      return of()
    }
  }

  cancelApplication(jobId: any) {
    const apiKey = localStorage.getItem('api_key')
    const username = localStorage.getItem('username')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : `ApiKey ${username}:${apiKey}`
      })
      return this.http.delete(`${this.jobOffersUrl}${jobId}/cancel-application/`, {headers}).pipe(
        catchError(handleError<any>('cancelApplication'))
      )
    } else {
      return of()
    }
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.jobOffersUrl}?all=true&bypass_auth=true`).pipe(
      catchError(handleError<any>('getAllJobs'))
    )
  }
}

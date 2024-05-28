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

}

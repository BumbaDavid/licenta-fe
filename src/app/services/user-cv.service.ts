import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {handleError} from "../../handle-error";


@Injectable({
  providedIn: 'root'
})
export class UserCvService {

  private updateUserCVUrl = 'http://localhost:8000/api/v1/userCV/update-cv/'

  constructor(private http: HttpClient) { }

  updateUserCV(data: any): Observable<any>{
    const apiKey = localStorage.getItem('api_key')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : apiKey
      })
      return this.http.patch<any>(this.updateUserCVUrl, data, {headers}).pipe(
        catchError(handleError<any>('updateUserCVData'))
      )
    } else {
      return of()
    }
  }
  deleteCVEntry(data: any): Observable<any>{
    const apiKey = localStorage.getItem('api_key')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization' : apiKey
      })

      const options = {
        headers: headers,
        body: data,
      }
      return this.http.delete<any>(this.updateUserCVUrl, options).pipe(
        catchError(handleError<any>('updateUserCVData'))
      )
    } else {
      return of()
    }
  }
}


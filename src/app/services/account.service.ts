import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private updateUserUrl = 'http://127.0.0.1:8000/api/v1/userLogin/update-user/';
  private userDataUrl = 'http://127.0.0.1:8000/api/v1/userLogin/user-data/';
  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    if (apiKey){
      const headers = new HttpHeaders({
        'Authorization': apiKey
      });
      return this.http.get<any>(this.userDataUrl, { headers }).pipe(
        catchError(this.handleError<any>('getUserData'))
      )
    } else {
      return of();
    }
  }

  updateUserData(data: any): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    if(apiKey){
      const headers = new HttpHeaders({
        'Authorization': apiKey
      })
      return this.http.post<any>(this.updateUserUrl, data, {headers}).pipe(
        catchError(this.handleError<any>('updateUserData'))
      )
    } else {
      return of();
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}

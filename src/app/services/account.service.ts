import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {handleError} from "../../handle-error";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userUrl = 'http://localhost:8000/api/v1/userLogin/';
  private updateUserUrl = 'http://localhost:8000/api/v1/userLogin/update-user/';
  private userDataUrl = 'http://127.0.0.1:8000/api/v1/userLogin/user-data/';
  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const apiKey = localStorage.getItem('api_key')
    if (apiKey){
      const headers = new HttpHeaders({
        'Authorization': apiKey
      });
      return this.http.get<any>(this.userDataUrl, { headers }).pipe(
        catchError(handleError<any>('getUserData'))
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
        catchError(handleError<any>('updateUserData'))
      )
    } else {
      return of();
    }
  }

  deleteUser(userId: any): Observable<any> {
   if(userId) {
     const username = localStorage.getItem('username')
     const api_key = localStorage.getItem('api_key')
     const headers = new HttpHeaders({
       'Authorization': `ApiKey ${username}:${api_key}`
     })

     return this.http.delete(`${this.userUrl}${userId}`, {headers}).pipe(
       catchError(handleError<any>('deleteUser'))
     )
   } else {
     return of()
   }
  }



}

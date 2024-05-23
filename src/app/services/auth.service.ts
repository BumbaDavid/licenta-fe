import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl= 'http://127.0.0.1:8000/api/v1/userLogin/login/';
  private logoutUrl = 'http://127.0.0.1:8000/api/v1/userLogin/logout/';
  private validateUrl = 'http://127.0.0.1:8000/api/v1/userLogin/validate/';
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<string> {
    const body = {username, password}
    return this.http.post<{api_key: string}>(this.loginUrl, body).pipe(
      map(response => response.api_key),
      catchError(this.handleError<string>('login'))
    );
  }

  logout(): Observable<void> {
    const apiKey = localStorage.getItem('api_key')
    if(apiKey) {
      const headers = new HttpHeaders({
        'Authorization': apiKey
      });
      return this.http.post<void>(this.logoutUrl, {}, { headers }).pipe(
      catchError(this.handleError<void>('logout'))
      );
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

  validateKey(apiKey: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': apiKey
    });
    return this.http.get<{valid: boolean}>(this.validateUrl, {headers}).pipe(
      map(response => {
        console.log('validation response', response.valid)
        return response.valid
      }),
      catchError(err => {
        console.error('validation err: ', err)
        return of(false)
      })
    )
  }
}
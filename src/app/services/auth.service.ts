import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl= 'http://127.0.0.1:8000/api/v1/userLogin/login/';
  private logoutUrl = 'http://127.0.0.1:8000/api/v1/userLogin/logout/';
  private validateUrl = 'http://127.0.0.1:8000/api/v1/userLogin/validate/';
  private userRegistrationUrl = 'http://127.0.0.1:8000/api/v1/userLogin/';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: any, password: any): Observable<HttpResponse<any>> {
    const body = {username, password}
    return this.http.post<{data: { api_key: string, username: string, account_type: string }}>(
      this.loginUrl,
      body,
      {observe: 'response'}
    ).pipe(
      map(response => response as HttpResponse<{ data: { api_key: string, username: string, account_type: string } }>), // Ensure correct type
      catchError(this.handleError<HttpResponse<{ data: { api_key: string, username: string, account_type: string } }>>('login'))
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

  register(registrationInfo: any): Observable<any> {
    return this.http.post(this.userRegistrationUrl, registrationInfo).pipe(
      switchMap(() => this.login(registrationInfo?.username, registrationInfo?.password)),
      switchMap(async api_key => {
        await this.router.navigate(['/homepage']);
        return api_key;
      }),
      catchError(this.handleError<void>('register'))
    )
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

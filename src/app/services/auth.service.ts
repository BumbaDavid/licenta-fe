import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {LoginData} from "../models/models";

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
    return this.http.post<{data: LoginData}>(
      this.loginUrl,
      body,
      {observe: 'response'}
    ).pipe(
      map(response => response as HttpResponse<{ data: LoginData }>),
      catchError(this.handleError<HttpResponse<{ data: LoginData }>>('login'))
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
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
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

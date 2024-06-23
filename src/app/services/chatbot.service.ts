import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {handleError} from "../../handle-error";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
   jobRecommendationsUrl = "http://127.0.0.1:8000/api/v1/chatbot/search/"
  constructor(private http: HttpClient) { }


  geJobRecommendations(data: any): Observable<HttpResponse<any>>{
    const username = localStorage.getItem('username')
    const api_key = localStorage.getItem('api_key')
    const headers = new HttpHeaders({
      'Authorization': `ApiKey ${username}:${api_key}`
    })

    return this.http.post<any>(this.jobRecommendationsUrl, data, {
      headers: headers,
      observe: 'response'
    }).pipe(
      catchError(handleError<any>('geJobRecommendations'))
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { email, password });
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, { email, password });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<boolean>(this.baseUrl)
      .pipe(catchError(() => of(false)));
  }
}

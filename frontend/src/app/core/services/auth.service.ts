import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl + "/Auth";
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}

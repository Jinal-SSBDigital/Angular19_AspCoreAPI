import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = 'https://localhost:7120/api/loginauth/login';
    // apiUrl = 'https://your-api-url.com/api/login';
  constructor(private http:HttpClient ) { }

  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, credentials);
  // }
  login(data: any): Observable<any> {
    debugger
    return this.http.post(this.apiUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly storageKey = 'bseb_fullData';
   apiUrl = 'https://localhost:7120/api/loginauth/login';
    // apiUrl = 'https://your-api-url.com/api/login';
  constructor(private http:HttpClient,private router:Router ) { }

  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, credentials);
  // }
  login(data: any): Observable<any> {
    debugger
    // return this.http.post(this.apiUrl, data);
    return this.http.post<any>(this.apiUrl, data).pipe(tap(response => {
        this.saveLogin(response);
    })
   );
  }

  saveLogin(fullData: any) {
      try
       {
          sessionStorage.setItem(this.storageKey, JSON.stringify(fullData));
      }
      catch(error)
      {    
          console.error('Error saving login data to localStorage', error);
      }

  }
  getFulldata(): any | null {
    try {
        const data = sessionStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    } 
    catch (error) 
    {
        console.error('Error retrieving login data from localStorage', error);
        return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getFulldata();
  }

  logout(redirect = true){
    try {
        sessionStorage.removeItem(this.storageKey);     
  }
    catch (error) {
        console.error('Error removing login data from localStorage', error);
    } 

    if (redirect) {
        this.router.navigate(['/login']);
    }
  }
}

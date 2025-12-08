import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    fullData: any = null;
  collegeName = 'No College Name';
  collegeCode = 'No College Code';
  isAdmin = false;
    constructor(private router: Router, private auth: AuthService) {
    // Prefer sessionStorage via AuthService. Fallback to router state if navigation passed it.
    const nav = this.router.getCurrentNavigation();
    const navData = nav?.extras?.state?.['fullData'];
    if (navData) {
      this.fullData = navData;
      this.auth.saveLogin(navData); // persist
    } else {
      this.fullData = this.auth.getFulldata();
    }

    if (this.fullData) {
      this.collegeName = this.fullData.collegeName || this.fullData.CollegeName || this.collegeName;
      this.collegeCode = this.fullData.collegeCode || this.fullData.CollegeCode || this.collegeCode;
      this.isAdmin = this.fullData.collegeName;
    }
  }

  onLogout(){
    sessionStorage.clear();
    location.href="/login";
  }
  onMyModule(){
    // const userData = sessionStorage.getItem('userData');
    const full = this.auth.getFulldata?.() ?? null;
    if (!full) {
      // no session — go to login
      this.router.navigate(['/login']);
      return;
    }

    // Save to session (defensive) and navigate to dashboard route
    this.auth.saveLogin?.(full);
   
    this.router.navigate(['/dashboard'], { state: { fullData: full } }); 
  }
  //  goToDashboard() {
  //   this.onMyModule();
  // }
}

// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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
      this.isAdmin = this.collegeName === 'Admin';
    }
  }

  ngOnInit(): void {
    console.log('Received Data:', this.fullData);
    if (!this.auth.isLoggedIn()) {
      // If no login data, redirect to login
      this.router.navigate(['/login']);
    }
  }

  // goToPreExam() {
  //   // navigate to the preexam page — adjust path if different
  //   this.auth.saveLogin(this.fullData); // ensure data is saved
  //   this.router.navigate(['/dwnld-exam-form']);
  // }

  goToStudentRegistration() {
     this.auth.saveLogin(this.fullData); // ensure data is saved
    this.router.navigate(['/dwnld-reg-form']);
    // this.router.navigate(['/dashboard/student-registration']);
  }

  logout() {
    this.auth.logout();
  }
}

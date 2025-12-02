import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,    
  imports: [FormsModule,
    CommonModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  captchaInput: string = '';

  num1 = 0;
  num2 = 0;
  result = 0;

  showPass = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    this.num1 = Math.floor(Math.random() * 20) + 1;
    this.num2 = Math.floor(Math.random() * 20) + 1;
    this.result = this.num1 + this.num2;
    this.captchaInput = '';
  }

  togglePassword() {
    this.showPass = !this.showPass;
  }

  downloadAllFiles() {
    const files = [
      "assets/Notifications/Vocational-Ex-Students.pdf",
      "assets/Notifications/Art-Ex-Student's.pdf",
      "assets/Notifications/Commerce-Ex-Student's.pdf",
      "assets/Notifications/Science-Ex-Students.pdf"
    ];

    files.forEach(file => {
      const a = document.createElement("a");
      a.href = file;

      const fileName = file.split('/').pop() ?? '';
      a.download = fileName;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  submitLogin() {

    if (+this.captchaInput !== this.result) {
      Swal.fire('Failed', 'Captcha incorrect. Try again.', 'error');
      this.generateCaptcha();
      return;
    }

    const data = {
      username: this.username,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: res => {
        Swal.fire('Success', 'Login successful!', 'success');
        this.router.navigate(['/dashboard'],{state: {fullData: res}});
      },
      error: err => {
        Swal.fire('Error', 'Invalid username or password', 'error');
      }
    });
    
  }
}

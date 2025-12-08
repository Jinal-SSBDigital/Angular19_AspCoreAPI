import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
   standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
collegeName ='';
isAdmin = false;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    debugger;
    const navFull=(history.state && history.state['fullData']) ? history.state['fullData'] : null;
    const fullData = navFull ? navFull : this.auth.getFulldata?.();
    if (fullData) 
    {
      this.collegeName=fullData.collegeName;
       this.isAdmin= this.collegeName === 'Admin';
    }
  }
}

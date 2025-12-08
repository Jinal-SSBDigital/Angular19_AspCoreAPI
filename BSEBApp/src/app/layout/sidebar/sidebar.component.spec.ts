import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { SidebarComponent } from './sidebar.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{}
// describe('SidebarComponent', () => {
//   let component: SidebarComponent;
//   let fixture: ComponentFixture<SidebarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [SidebarComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SidebarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

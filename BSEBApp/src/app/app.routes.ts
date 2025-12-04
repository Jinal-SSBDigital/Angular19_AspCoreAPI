import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DwnldRegFormComponent } from './pages/dwnld-reg-form/dwnld-reg-form.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    // { path: 'login', component: LoginComponent },
    // {path: '**', redirectTo: 'login'},
    {path: '',redirectTo: 'login',pathMatch: 'full'},
    {path: 'login',loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    {path: 'dashboard',loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    {path : '', component: LayoutComponent,
        children: [
        { path: '', component: DashboardComponent },
        { path: 'dwnld-reg-form', component: DwnldRegFormComponent },
        ]
    }

//    { path: 'dwnld-reg-form', component: DwnldRegFormComponent }
];

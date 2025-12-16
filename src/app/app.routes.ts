import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
    { path: 'empleados', loadComponent: () => import('./empleados/empleados-list.component').then(m => m.EmpleadosListComponent) },
    { path: '**', redirectTo: '' }
];

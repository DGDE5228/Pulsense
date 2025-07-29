import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'graficas',
    loadComponent: () => import('./pages/informacion/graficas.page').then(m => m.GraficasPage)
  },
  {
    path: 'iot',
    loadComponent: () => import('./pages/iot/iot.page').then(m => m.IotPage)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then(m => m.ContactoPage)
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.page').then(m => m.TestComponent) // 👈 AGREGADO
  }
];

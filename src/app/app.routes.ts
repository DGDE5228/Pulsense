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
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    children: [
      {
        path: 'graficas',
        loadComponent: () => import('./pages/graficas/graficas.page').then(m => m.GraficasPage)
      },
      {
        path: 'iot',
        loadComponent: () => import('./pages/iot/iot.page').then(m => m.IotPage)
      },
      {
        path: 'tecnico',
        loadComponent: () => import('./pages/tecnico/tecnico.page').then(m => m.TecnicoPage)
      },
      {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto.page').then(m => m.ContactoPage)
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  estaAutenticado(): boolean {
    // ejemplo: verifica si hay token en localStorage
    return !!localStorage.getItem('token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token'); // limpia el token o lo que uses
    // también puedes limpiar otros datos si es necesario
  }
}

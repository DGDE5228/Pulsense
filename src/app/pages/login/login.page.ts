import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel
  ]
})
export class LoginPage {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Debes llenar todos los campos';
      this.successMessage = '';
      return;
    }

    this.http.post('https://pulsense.onrender.com/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          (document.activeElement as HTMLElement)?.blur(); // 🧼 evita el error de accesibilidad
          this.errorMessage = '';
          this.successMessage = 'Inicio de sesión exitoso';

          this.router.navigate(['/dashboard']); // redirección tras login
        } else {
          this.errorMessage = res.message || 'Usuario o contraseña inválidos';
          this.successMessage = '';
        }
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.errorMessage = err.error?.message || 'Error del servidor';
        this.successMessage = '';
      }
    });
  }

  register() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Debes llenar todos los campos para registrarte';
      this.successMessage = '';
      return;
    }

    this.http.post('https://pulsense.onrender.com/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          (document.activeElement as HTMLElement)?.blur(); // evita el error de foco
          this.errorMessage = '';
          this.successMessage = 'Usuario registrado correctamente';

          // Redirigir al login luego de breve mensaje
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']);
          }, 1200);
        } else {
          this.errorMessage = res.message || 'Error al registrar';
          this.successMessage = '';
        }
      },
      error: (err) => {
        console.error('❌ Error en registro:', err);
        this.errorMessage = err.error?.message || 'Error del servidor';
        this.successMessage = '';
      }
    });
  }
}

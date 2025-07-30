import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  AlertController
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Debes llenar todos los campos';
      this.successMessage = '';
      return;
    }

    this.http.post('https://pulsenseback.onrender.com/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('📦 Respuesta de login:', res);
        if (res && res.success) {
          (document.activeElement as HTMLElement)?.blur();
          this.errorMessage = '';
          this.successMessage = 'Inicio de sesión exitoso';
          this.router.navigate(['/dashboard']);
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

    this.http.post('https://pulsenseback.onrender.com/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: async (res: any) => {
        if (res.success) {
          (document.activeElement as HTMLElement)?.blur();
          this.errorMessage = '';
          this.successMessage = 'Usuario registrado correctamente';

          // Alerta modal que se cierra sola tras 2.5s
          const alert = await this.alertController.create({
            header: 'Registro exitoso',
            message: 'Tu usuario ha sido creado correctamente. Puedes iniciar sesion ahora',
            buttons: [],
          });
          await alert.present();
          setTimeout(() => alert.dismiss(), 2500);

          // Redirige tras un breve delay
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']);
          }, 2800);
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

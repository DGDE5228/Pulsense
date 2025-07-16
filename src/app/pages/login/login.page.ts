import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async login() {
    if (!this.username || !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Campos vacíos',
        message: 'Por favor ingresa usuario y contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.http
      .post<any>('https://localhost.com/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: async (res) => {
          if (res.success) {
            this.router.navigate(['/dashboard']);
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: res.message || 'Credenciales incorrectas',
              buttons: ['OK'],
            });
            await alert.present();
          }
        },
        error: async (err) => {
          const alert = await this.alertCtrl.create({
            header: 'Error de conexión',
            message: err.error?.message || 'Error al conectar con el servidor',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

  async register() {
    if (!this.username || !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Campos vacíos',
        message: 'Por favor ingresa usuario y contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.http
      .post<any>('https://localhost.com/register', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: async (res) => {
          if (res.success) {
            const alert = await this.alertCtrl.create({
              header: 'Éxito',
              message: res.message || 'Cuenta creada correctamente',
              buttons: ['OK'],
            });
            await alert.present();
            this.router.navigate(['/login']); // o dashboard si prefieres
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: res.message || 'No se pudo registrar',
              buttons: ['OK'],
            });
            await alert.present();
          }
        },
        error: async (err) => {
          const alert = await this.alertCtrl.create({
            header: 'Error del servidor',
            message: err.error?.message || 'Error al registrar usuario',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }
}

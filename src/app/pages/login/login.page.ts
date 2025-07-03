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
    this.http
      .post<any>('http://localhost:3000/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
       error: async (err) => {
  console.error('Error login:', err); // 👈 importante
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: err.error?.message || 'Error desconocido',
    buttons: ['OK'],
  });
  await alert.present();
},

      });
  }
}

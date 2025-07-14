import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // <--- aquí asegúrate que esté IonicModule
})


export class RegisterPage {
  username = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    if (this.username && this.password) {
      // Guardamos usuario y contraseña (NO recomendado para producción)
      localStorage.setItem('user', this.username);
      localStorage.setItem('pass', this.password);
      alert('¡Usuario registrado!');
      this.router.navigate(['/login']);
    } else {
      alert('Debes llenar los campos');
    }
  }
}

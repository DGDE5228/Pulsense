import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonHeader } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, RouterModule, IonHeader],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  constructor(
    private router: Router,
    private alertController: AlertController,
    public AuthService: AuthService
  ) {}

  get estaAutenticado(): boolean {
    return this.AuthService.estaAutenticado();
  }

  manejarLogin() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    this.AuthService.cerrarSesion(); // ← tu método en AuthService para limpiar sesión
    this.router.navigate(['/login']);
  }
}

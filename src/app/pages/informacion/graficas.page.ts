import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
  standalone: true,
  imports: [IonContent,RouterModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class GraficasPage {

}

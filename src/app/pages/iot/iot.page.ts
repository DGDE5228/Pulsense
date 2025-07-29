import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.page.html',
  styleUrls: ['./iot.page.scss'],
  standalone: true,
  imports: [IonContent,RouterModule, IonHeader,IonCol, IonRow, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid]
})
export class IotPage  {


}

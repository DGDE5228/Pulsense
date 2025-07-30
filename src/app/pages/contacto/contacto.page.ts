import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonImg, IonHeader, IonTitle,IonList,IonIcon, IonLabel, IonItem, IonToolbar,IonCard , IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonContent,IonImg, IonHeader, IonTitle,IonList, IonIcon, IonLabel,IonItem,IonCard , IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle ,IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class ContactoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

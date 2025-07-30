import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private subject = new Subject<any>();

  constructor() {
    this.socket = new WebSocket('ws://192.168.120.141:81'); // Cambia IP si se actualiza

    this.socket.onopen = () => {
      console.log('✅ WebSocket conectado al ESP32');
    };

    this.socket.onerror = (error) => {
      console.error('❌ Error en WebSocket', error);
    };

    this.socket.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        this.subject.next(data);
      } catch (e) {
        console.error('⚠️ No se pudo parsear el mensaje', msg.data);
      }
    };
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}

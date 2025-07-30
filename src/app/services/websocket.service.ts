import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private subject = new Subject<any>();

  constructor() {
    const isLocal = location.hostname === 'localhost' || location.hostname.startsWith('192.168.');
  
    const socketUrl = isLocal
      ? 'ws://192.168.120.141:81'
      : 'wss://pulsenseback.onrender.com';

    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log(`✅ WebSocket conectado a ${socketUrl}`);
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

  // ✅ Este método es necesario
  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}

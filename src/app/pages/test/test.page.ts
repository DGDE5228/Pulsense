import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { WebsocketService } from '../../services/websocket.service';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule,
    RouterLink,
    RouterLinkActive, IonContent, IonHeader],
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestComponent implements OnInit {
  public espIp: string | null = null;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Pulso',
        borderColor: '#00ffc6',
        backgroundColor: 'rgba(0, 255, 198, 0.3)',
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0.4
      },
    ],
  };
public lineChartType: 'line' = 'line';

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 750,
        max: 1050,
      }
    }
  };

  constructor(private ws: WebsocketService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ws.getMessages().subscribe((data: any) => {
      if (data.ip) {
        this.espIp = data.ip;
        this.cdr.detectChanges();
        return;
      }

      if (typeof data.pulso === 'number') {
        const valor = data.pulso;
        const tiempo = new Date().toLocaleTimeString();

        const maxPuntos = 20;
        this.lineChartData.labels?.push(tiempo);
        this.lineChartData.datasets[0].data.push(valor);

        if ((this.lineChartData.labels?.length || 0) > maxPuntos) {
          this.lineChartData.labels?.shift();
          this.lineChartData.datasets[0].data.shift();
        }

        this.cdr.detectChanges();
      }
    });
  }
}

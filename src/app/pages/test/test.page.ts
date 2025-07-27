import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { IonicModule } from '@ionic/angular';
import { WebsocketService } from '../../services/websocket.service';

// Registro de componentes necesarios de Chart.js
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
} from 'chart.js';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, IonicModule, NgChartsModule],
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit {
  public espIp: string | null = null;

  public lineChartData: ChartConfiguration['data'] = {
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

public lineChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {},
    y: {
      min: 750,
      max: 1050,
    }
  }
};


  public lineChartType: ChartType = 'line';

  constructor(
    private ws: WebsocketService,
    private cdr: ChangeDetectorRef
  ) {}

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

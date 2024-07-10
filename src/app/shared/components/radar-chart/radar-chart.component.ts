import { Component, Input } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    BaseChartDirective
  ],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss'
})
export class RadarChartComponent {
  @Input() data!: ChartData<'radar'>;
  @Input() options!: ChartOptions<'radar'>;
  @Input() legend: boolean = true;
  @Input() type: 'radar' = 'radar';
}

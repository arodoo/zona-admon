import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StatisticalDataService } from '../../../../core/services/statistical-data.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart-accidents',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart-accidents.component.html',
  styleUrl: './line-chart-accidents.component.scss'
})
export class LineChartAccidentsComponent implements OnInit, OnChanges {
  @Input()year!: number;

  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      { data: [], label: 'Accidentes en el año corriente' },
    ]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  constructor(private statisticalDataService: StatisticalDataService) { }

  ngOnInit(): void {
    this.loadYearlyData(this.year);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year'] && !changes['year'].firstChange) {
      this.loadYearlyData(changes['year'].currentValue);
    }
  }

  loadYearlyData(year: number): void {
    this.statisticalDataService.getYearlyData(year).subscribe({
      next: (data) => {
        this.lineChartData.datasets[0].data = data;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }
}

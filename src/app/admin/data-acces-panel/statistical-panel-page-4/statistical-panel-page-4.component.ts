import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { YearSelectorComponent } from '../../../shared/components/year-selector/year-selector.component';

import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { ChartWrapperComponent } from '../../../shared/templates/chart-wrapper/chart-wrapper.component';



import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-statistical-panel-page-4',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    YearSelectorComponent,
    ChartWrapperComponent,

  ],
  templateUrl: './statistical-panel-page-4.component.html',
  styleUrl: './statistical-panel-page-4.component.scss',
  animations: [fadeAnimation]
})

//Injured barChart componente
export class StatisticalPanelPage4Component implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective) deathsChart!: BaseChartDirective;

  @Input() showYearSelector: boolean = true;

  constructor(private statisticalDataService: StatisticalDataService) { }

  ngOnInit(): void {
    console.log(this.showYearSelector);

  }

  ngAfterViewInit(): void {
    this.loadYearlyDeaths(this.selectedYear);
  }


  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public barChartLegend = true;
  public barChartType: 'bar' = 'bar';

  public userReportsData: number[] = [100, 120, 140, 110, 130, 150, 160];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [],
        label: 'Heridos en el año corriente',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  loadYearlyDeaths(year: number): void {
    this.statisticalDataService.getYearlyInjuries(year).subscribe({
      next: (data) => {
        //console.log('Datos recibidos:', data); // Verifica los datos aquí
        this.barChartData.datasets[0].data = data;
        this.deathsChart.chart?.update();
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }


  //logic to manage years selection
  public selectedYear = new Date().getFullYear();
  onYearChange(year: number): void {
    this.selectedYear = year;
    this.loadYearlyDeaths(year);
  }

}

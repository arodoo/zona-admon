import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { ChartWrapperComponent } from '../../../shared/templates/chart-wrapper/chart-wrapper.component';


import { fadeAnimation } from '../../../shared/animations/fade-animation';
@Component({
  selector: 'app-statistical-panel-page-5',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule, CommonModule,
    BaseChartDirective,
    ChartWrapperComponent,],
  templateUrl: './statistical-panel-page-5.component.html',
  styleUrl: './statistical-panel-page-5.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage5Component implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  constructor(private statisticalDataService: StatisticalDataService) { }

  ngOnInit(): void {
    this.getYears();
    this.loadYearlyData(this.selectedYear1, this.selectedYear2);
    //this.loadYearlyDeaths(this.selectedYear1);
  }

  ngAfterViewInit(): void {
    //this.loadYearlyDeaths(this.selectedYear);
  }

  //handle selected years
  public years: number[] = [];
  public selectedYear1 = new Date().getFullYear();
  public selectedYear2 = new Date().getFullYear() - 1;

  // Radar Chart Data
  public radarChartData: ChartData<'radar'> = {
    labels: ['Accidentes', 'Muertes', 'Heridos', 'Población (escala 1:100,000)'],
    datasets: [
      { data: [], label: `Estadísticas 1` },
      { data: [], label: `Estadísticas 2` }
    ]
  };

  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
  };

  public radarChartLegend = true;
  public radarChartType: 'radar' = 'radar';


  //function to get years from today to last 10 years
  getYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i > currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  onYearChange(year: number, dropdown: number): void {
    if (dropdown === 1) {
      this.selectedYear1 = year;
    } else {
      this.selectedYear2 = year;
    }
    this.loadYearlyData(this.selectedYear1, this.selectedYear2);
  }

  // Método orquestador para cargar todos los datos
  loadYearlyData(year1: number, year2: number): void {
    console.log('Loading data for years:', year1, year2);
    this.loadYearlyAccidents(year1, 0);
    this.loadYearlyDeaths(year1, 0);
    this.loadYearlyInjuries(year1, 0);
    this.loadYearlyPopulation(year1, 0);

    this.loadYearlyAccidents(year2, 1);
    this.loadYearlyDeaths(year2, 1);
    this.loadYearlyInjuries(year2, 1);
    this.loadYearlyPopulation(year2, 1);
  }

  // Método para cargar datos de accidentes
  loadYearlyAccidents(year: number, datasetIndex: number): void {
    this.statisticalDataService.getYearlyAccidents(year).subscribe({
      next: (data) => {
        //console.log(`Accidents data for year ${year}:`, data);
        this.radarChartData.datasets[datasetIndex].data[0] = data.reduce((a, b) => a + b, 0);
        this.chart?.update();
      },
      error: (err) => {
        console.error(`Error loading accidents for year ${year}:`, err);
      }
    });
  }

  // Método para cargar datos de muertes
  loadYearlyDeaths(year: number, datasetIndex: number): void {
    this.statisticalDataService.getYearlyDeaths(year).subscribe({
      next: (data) => {
        //console.log(`Deaths data for year ${year}:`, data);
        this.radarChartData.datasets[datasetIndex].data[1] = data.reduce((a, b) => a + b, 0);
        this.chart?.update();
      },
      error: (err) => {
        console.error(`Error loading deaths for year ${year}:`, err);
      }
    });
  }

  // Método para cargar datos de heridos
  loadYearlyInjuries(year: number, datasetIndex: number): void {
    this.statisticalDataService.getYearlyInjuries(year).subscribe({
      next: (data) => {
        //console.log(`Injuries data for year ${year}:`, data);
        this.radarChartData.datasets[datasetIndex].data[2] = data.reduce((a, b) => a + b, 0);
        this.chart?.update();
      },
      error: (err) => {
        console.error(`Error loading injuries for year ${year}:`, err);
      }
    });
  }

  // Método para cargar datos de población
  loadYearlyPopulation(year: number, datasetIndex: number): void {
    this.statisticalDataService.getYearlyPopulation(year).subscribe({
      next: (data) => {
        // Dividir los datos de población por 1000
        const scaledData = data.map(value => value / 100000);
        console.log(`Population data for year ${year}:`, scaledData);
        
        this.radarChartData.datasets[datasetIndex].data[3] = scaledData.reduce((a, b) => a + b, 0);
        this.chart?.update();

      },
      error: (err) => {
        console.error(`Error loading population for year ${year}:`, err);
      }
    });
  }

}

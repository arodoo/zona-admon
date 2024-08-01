import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SearchResultsComponent } from '../../../shared/components/search-results/search-results.component';
import { YearSelectorComponent } from '../../../shared/components/year-selector/year-selector.component';

import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { ChartWrapperComponent } from '../../../shared/templates/chart-wrapper/chart-wrapper.component';

import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { Incident } from '../../../core/models/incident.interface';


@Component({
  selector: 'app-statistical-panel-page-1',
  standalone: true,
  imports: [CommonModule,
    AppTitleComponent, SearchBarComponent, SearchResultsComponent,
    BaseChartDirective,
    YearSelectorComponent,
    ChartWrapperComponent,
  ],
  templateUrl: './statistical-panel-page-1.component.html',
  styleUrl: './statistical-panel-page-1.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage1Component implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective) lineChart!: BaseChartDirective;


  //to store the search results
  searchResults: Incident[] = [];

  public years: number[] = [];
  public selectedYear = new Date().getFullYear();

  // Line chart data

  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      { data: [], label: 'Accidentes en el año corriente' },
    ]
  };


  public lineChartLabels: ChartData['labels'] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';

  onYearChange(year: number): void {
    this.selectedYear = year;
   this.loadYearlyData(this.selectedYear);
  }

  loadYearlyData(year: number): void {
    this.statisticalDataService.getYearlyAccidents(year).subscribe({
      next: (data) => {
        this.lineChartData.datasets[0].data = data;
        this.lineChart.chart?.update();
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

  constructor(
    private statisticalDataService: StatisticalDataService,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadYearlyData(this.selectedYear);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { YearSelectorComponent } from '../../../shared/components/year-selector/year-selector.component';

import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { ChartWrapperComponent } from '../../../shared/templates/chart-wrapper/chart-wrapper.component';

//Component to display the top 10 municipalities with the most deaths
@Component({
  selector: 'app-statistical-panel-page-7',
  standalone: true,
  imports: [
    BaseChartDirective,
    YearSelectorComponent,
    ChartWrapperComponent,
  ],
  templateUrl: './statistical-panel-page-7.component.html',
  styleUrl: './statistical-panel-page-7.component.scss'
})

//Pie chart top municipios con más muertes
export class StatisticalPanelPage7Component implements OnInit{

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(private statisticalDataService: StatisticalDataService) { }

  ngOnInit(): void {
    this.loadDeathsByMunicipality(this.selectedYear);
  }

  // Pie Chart Data
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [],
         label: 'Muertes',
         //then diferents colors
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6633', '#FF33FF', '#33FF33', '#33CCFF']
      }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,

  };

  public pieChartLegend = true;
  public pieChartType: 'pie' = 'pie';

  //logic to manage years selection
  public selectedYear = new Date().getFullYear();
  onYearChange(year: number): void {
    this.selectedYear = year;
    this.loadDeathsByMunicipality(year);
  }

  loadDeathsByMunicipality(year: number): void {
    this.statisticalDataService.getDeathsByMunicipality(year).subscribe(data => {
      const sortedData = data.sort((a, b) => b.deaths - a.deaths).slice(0, 10);
      this.pieChartData.labels = sortedData.map(item => item.municipality);
      this.pieChartData.datasets[0].data = sortedData.map(item => item.deaths);
      this.chart?.update();
    });
  }
}

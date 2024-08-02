import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { StatisticalPanelPage3Component } from '../data-acces-panel/statistical-panel-page-3/statistical-panel-page-3.component';
import { StatisticalPanelPage4Component } from '../data-acces-panel/statistical-panel-page-4/statistical-panel-page-4.component';

import { StatisticalDataService } from '../../core/services/statistical-data.service';

import { fadeAnimation } from '../../shared/animations/fade-animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BaseChartDirective,
    MatListModule, MatIconModule, MatCardModule,
    StatisticalPanelPage3Component, StatisticalPanelPage4Component],
  templateUrl: './home.component.html',
  animations: [fadeAnimation],
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  newUsersThisYear: number = 0;
  registersThisYear: number = 0;
  currentYear: number = new Date().getFullYear();

  mostDeadlyMunicipality = 'Municipio 1';

  constructor(private statisticalDataService: StatisticalDataService) { }

  ngOnInit(): void {
    this.loadYearlyData();
    this.setMostDeadlyMunicipalityOnCurrentYear();
  }

  public userReportsData: number[] = [100, 120, 140, 110, 130, 150, 160];
  //chars
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public barChartLegend = true;
  public barChartType: 'bar' = 'bar';


  public userReportsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        data: this.userReportsData,
        label: 'Registros',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        data: [40, 45, 50, 55, 60, 65, 70],
        label: 'Reportes',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  private loadYearlyData(): void {
    this.statisticalDataService.getYearlyNewUsersNumber(this.currentYear).subscribe(data => {
      this.newUsersThisYear = data;
    });

    this.statisticalDataService.getYearlyRegistersNumber(this.currentYear).subscribe(data => {
      this.registersThisYear = data;
    });
  }

  private setMostDeadlyMunicipalityOnCurrentYear(): void {
    this.statisticalDataService.getMostDeadlyMunicipality(this.currentYear).subscribe(data => {
      this.mostDeadlyMunicipality = data;
    });
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
@Component({
  selector: 'app-statistical-panel-page-2',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe, MatTableModule, MatPaginator,
    BaseChartDirective, MatListModule, MatIconModule, MatCardModule],
  templateUrl: './statistical-panel-page-2.component.html',
  styleUrl: './statistical-panel-page-2.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage2Component implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('Statistical panel home component initialized.');
  }

  //Radar Chart Data
  public radarChartData: ChartData<'radar'> = {
    labels: ['Accidentes', 'Muertes', 'Heridos'],
    datasets: [
      { data: [65, 59, 90], label: 'Estadísticas' }
    ]
  };

  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
  };

  public radarChartLegend = true;
  public radarChartType: 'radar' = 'radar';

  // Polar Area Chart Data
  public polarAreaChartData1: ChartData<'polarArea'> = {
    labels: ['Muertes', 'Accidentes'],
    datasets: [
      { data: [5, 237], label: 'Proporción Muertes/Accidentes' }
    ]
  };

  public polarAreaChartData2: ChartData<'polarArea'> = {
    labels: ['Heridos', 'Accidentes'],
    datasets: [
      { data: [50, 237], label: 'Proporción Heridos/Accidentes' }
    ]
  };

  public polarAreaChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
  };

  public polarAreaChartLegend = true;
  public polarAreaChartType: 'polarArea' = 'polarArea';

  // Pie Chart Data
  public pieChartData: ChartData<'pie'> = {
    labels: ['Xalapa', 'Veracruz', 'Coatepec', 'Boca del Río', 'Córdoba', 'Orizaba', 'Fortín', 'Ixtaczoquitlán', 'Río Blanco', 'Camerino Z. Mendoza'],
    datasets: [
      { data: [5, 15, 5, 25, 17, 9, 50, 12, 5, 5], label: 'Muertes' }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLegend = true;
  public pieChartType: 'pie' = 'pie';

  constructor(private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
  }

  ngAfterViewInit(): void {
    // Additional logic if needed
  }
}

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData, ChartDataset, Color } from 'chart.js';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';


import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-statistical-panel-page-1',
  standalone: true,
  imports: [CommonModule,
    AppTitleComponent,
    DateFormatPipe,
    MatTableModule, MatPaginator,
    BaseChartDirective,
    MatListModule, MatIconModule, MatCardModule
  ],
  templateUrl: './statistical-panel-page-1.component.html',
  styleUrl: './statistical-panel-page-1.component.html',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage1Component {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('Statistical panel home component initialized.');
  }

  displayedColumns: string[] = ['municipio', 'accidentes', 'muertes', 'heridos'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Asegúrate de que los tipos de datos coincidan con lo que espera Chart.js
  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Accidentes' },
    ]
  };


  public lineChartLabels: ChartData['labels'] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';

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

  constructor(private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  exportAsXLSX(): void {
    console.log('Exporting data as XLSX...');
  }

  exportAsPDF(): void {
    console.log('Exporting data as PDF...');
  }

  openModal() {
    console.log('Opening modal...');
  }

  openDetailsRegisterModal() {
    console.log('Opening details register modal...');
  }

}

const ELEMENT_DATA: any[] = [
  { municipio: 'Xalapa', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Veracruz', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Coatepec', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Boca del Río', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Córdoba', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Orizaba', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Fortín', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Ixtaczoquitlán', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Río Blanco', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Camerino Z. Mendoza', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Huatusco', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Acultzingo', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Ixhuatlancillo', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Ixhuatlán del Café', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'La Perla', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'María Lombardo', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Nogales', accidentes: 237, muertes: 5, heridos: 50 },
  { municipio: 'Rafael Delgado', accidentes: 237, muertes: 5, heridos: 50 },
  // Añade más datos ficticios aquí
];
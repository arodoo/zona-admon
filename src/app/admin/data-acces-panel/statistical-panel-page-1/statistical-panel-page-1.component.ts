import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData, ChartDataset, Color } from 'chart.js';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';


import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-statistical-panel-page-1',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatTableModule,
    AppTitleComponent, SearchBarComponent,
    DateFormatPipe,
    MatPaginator,
    BaseChartDirective,
    MatListModule, MatIconModule, MatCardModule, MatFormFieldModule, MatLabel,
  ],
  templateUrl: './statistical-panel-page-1.component.html',
  styleUrl: './statistical-panel-page-1.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage1Component implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Tabla de datos
  displayedColumns: string[] = ['municipio', 'accidentes', 'muertes', 'heridos'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Line chart data

  public years: number[] = [];
  public selectedYear = new Date().getFullYear();

  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Accidentes en el año corriente' },
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

  //function to get years from today to last 20 years
  getYears(): void {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    for (let i = currentYear; i > currentYear - 20; i--) {
      this.years.push(i);
    }
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    console.log('Selected year: ', year);
    
  }

  // Bar chart data
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
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: this.userReportsData,
        label: 'Heridos en el año corriente',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [40, 45, 50, 55, 60, 65, 70],
        label: 'Defuciones en el año corriente',
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

  ngOnInit(): void {
    this.getYears();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  handleSearchChange(event: any): void {
    console.log('Search changed:', event);
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
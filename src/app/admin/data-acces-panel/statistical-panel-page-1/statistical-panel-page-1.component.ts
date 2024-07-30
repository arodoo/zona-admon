import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData } from 'chart.js';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SearchResultsComponent } from '../../../shared/components/search-results/search-results.component';
import { UsePredictionModuleComponent } from '../use-prediction-module/use-prediction-module.component';

import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

import { BuldDataService } from '../../../core/services/buld-data.service';
import { StatisticalDataService } from '../../../core/services/statistical-data.service';

import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { Incident } from '../../../core/models/incident.interface';


@Component({
  selector: 'app-statistical-panel-page-1',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatTableModule,
    AppTitleComponent, SearchBarComponent, SearchResultsComponent,
    DateFormatPipe,
    MatPaginator,
    BaseChartDirective,
    MatListModule, MatIconModule, MatCardModule, MatFormFieldModule, MatLabel,
  ],
  templateUrl: './statistical-panel-page-1.component.html',
  styleUrl: './statistical-panel-page-1.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelPage1Component implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(BaseChartDirective) lineChart!: BaseChartDirective;
/*   @ViewChild('deathsChart') deathsChart!: BaseChartDirective;
  @ViewChild('injuriesChart') injuriesChart!: BaseChartDirective; */

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

  //function to get years from today to last 10 years
  getYears(): void {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    for (let i = currentYear; i > currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
   this.loadYearlyData(this.selectedYear);
    /* this.loadYearlyDeaths(this.selectedYear);
    this.loadYearlyInjuries(this.selectedYear); */
  }

  loadYearlyData(year: number): void {
    this.statisticalDataService.getYearlyData(year).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos aquí
        this.lineChartData.datasets[0].data = data;
        this.lineChart.chart?.update();
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

 /*  loadYearlyDeaths(year: number): void {
    this.statisticalDataService.getYearlyDeaths(year).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos aquí
        this.deathsReportsChartData.datasets[0].data = data;
        //this.deathsChart.chart?.update();
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

  loadYearlyInjuries(year: number): void {
    this.statisticalDataService.getYearlyInjuries(year).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos aquí
        
        this.hurtsReportsChartData.datasets[0].data = data;
        this.injuriesChart.chart?.update();
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.injuriesChart.update();
      }
    });
  } */

  // Bar chart data
 /*  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public barChartLegend = true;
  public barChartType: 'bar' = 'bar';

  public userReportsData: number[] = [100, 120, 140, 110, 130, 150, 160];

  public deathsReportsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [],
        label: 'Defuciones en el año corriente',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  public hurtsReportsChartData: ChartConfiguration<'bar'>['data'] = {
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
 */


  //Tabla de datos
  /* displayedColumns: string[] = ['municipio', 'accidentes', 'muertes', 'heridos'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); */

  constructor(private paginatorIntl: MatPaginatorIntl,
    private router: Router,
    private buldDataService: BuldDataService,
    private statisticalDataService: StatisticalDataService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
  }

  ngOnInit(): void {
    this.getYears();

  }

  ngAfterViewInit(): void {
    this.loadYearlyData(this.selectedYear);
    /* this.loadYearlyDeaths(this.selectedYear);
    this.loadYearlyInjuries(this.selectedYear); */
  }

  handleSearchChange(event: any): void {
    const searchTerm = event // Eliminar espacios en blanco    
    if (searchTerm.length > 0) {
      this.buldDataService.getBulkData(searchTerm).subscribe({
        next: (data) => {
          this.searchResults = data;
          console.log('Search results:', this.searchResults);
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  handleSearchResultClick(result: any): void {
    const { municipality } = result;
    this.router.navigate(['admin/statistical-panel/municipality', municipality]);
  }

  openUsePredictionModule() {
    const dialogRef = this.dialog.open(UsePredictionModuleComponent, {
      width: '700px',
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

/* const ELEMENT_DATA: any[] = [
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
]; */
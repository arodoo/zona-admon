import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { fadeAnimation } from '../../../shared/animations/fade-animation';

import { StatisticalPanelPage1Component } from '../statistical-panel-page-1/statistical-panel-page-1.component';
import { StatisticalPanelPage2Component } from '../statistical-panel-page-2/statistical-panel-page-2.component';
import { StatisticalPanelPage3Component } from '../statistical-panel-page-3/statistical-panel-page-3.component';

import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SearchResultsComponent } from '../../../shared/components/search-results/search-results.component';

import { PaginationServiceService } from '../../../core/services/pagination-service.service';
import { BuldDataService } from '../../../core/services/buld-data.service';

import { UsePredictionModuleComponent } from '../use-prediction-module/use-prediction-module.component';
import { Incident } from '../../../core/models/incident.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistical-panel-home',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, MatPaginator,
    StatisticalPanelPage1Component, StatisticalPanelPage2Component, StatisticalPanelPage3Component,
    SearchBarComponent, UsePredictionModuleComponent, SearchResultsComponent
  ],
  templateUrl: './statistical-panel-home.component.html',
  styleUrl: './statistical-panel-home.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage: number = 0;

  //to store the search results
  searchResults: Incident[] = [];

  constructor(private paginationService: PaginationServiceService,
    private buldDataService: BuldDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.paginationService.currentPage$.subscribe((page) => {
      this.currentPage = page;
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.paginationService.setCurrentPage(event.pageIndex);
    });
  }

  openUsePredictionModule() {
    const dialogRef = this.dialog.open(UsePredictionModuleComponent, {
      width: '700px',
    });
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
}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { fadeAnimation } from '../../../shared/animations/fade-animation';

import { StatisticalPanelPage1Component } from '../statistical-panel-page-1/statistical-panel-page-1.component';
import { StatisticalPanelPage2Component } from '../statistical-panel-page-2/statistical-panel-page-2.component';

import { PaginationServiceService } from '../../../core/services/pagination-service.service';

@Component({
  selector: 'app-statistical-panel-home',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, MatPaginator,
    StatisticalPanelPage1Component, StatisticalPanelPage2Component
  ],
  templateUrl: './statistical-panel-home.component.html',
  styleUrl: './statistical-panel-home.component.scss',
  animations: [fadeAnimation]
})
export class StatisticalPanelHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage: number = 0;

  constructor(private paginationService: PaginationServiceService) { }

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
}
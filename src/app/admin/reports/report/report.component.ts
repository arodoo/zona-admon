import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

interface Report {
  user: {
    name: string;
  };
  date: string;
  location: string;
}
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule,AppTitleComponent, DateFormatPipe, MatTableModule, MatPaginator],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit, AfterViewInit{
  $reports: Report[] = [];

  displayedColumns: string[] = ['user', 'date', 'location', 'actions'];
  dataSource = new MatTableDataSource<Report>(this.$reports);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
   }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() =>{
      window.scrollTo(0,0);
    })
  }

  ngOnInit(): void {
    this.generateTestReports();
  }



  async generateTestReports(): Promise<void> {
    for (let i = 0; i < 258; i++) {
              newDate: new Date(),
      this.$reports.push({
        user: { name: `Aureliano José Buendía ${i + 1}` },

        date: this.dateToString(new Date()),
        location: `Calle ${i + 1}, Colonia ${i + 1}, Ciudad ${i + 1}, CP ${i + 1}`
      });
    }
  }

  dateToString(date: Date): string {
    return date.toISOString();
  }

  generateReport() {
    console.log('Generating report...');
  }
  acceptReport() {
    console.log('Accepting report...');
  }

  denyReport(){
    console.log('Denying report...');
  }
  detailsReport(){
    console.log('Details report...');
  }

}

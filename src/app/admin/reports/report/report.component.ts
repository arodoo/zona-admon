import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule,AppTitleComponent, DateFormatPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{
  $reports: Report[] = [];
  constructor() { }

  ngOnInit(): void {
    this.generateTestReports();
  }

  async generateTestReports(): Promise<void> {
    for (let i = 0; i < 20; i++) {
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jsPDF from 'jspdf';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { AppTitleComponent } from "../app-title/app-title.component";
import { CommonModule } from '@angular/common';



@Component({
    standalone: true,
    selector: 'app-register-generate-report',
    templateUrl: './register-generate-report.component.html',
    styleUrls: ['./register-generate-report.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        AppTitleComponent,
        CommonModule
    ],  
    providers: [
      { provide: DateAdapter, useClass: MatNativeDateModule },
    ],

})
export class RegisterGenerateReportComponent implements OnInit {
  dateRangeForm: FormGroup;
  filteredData: any[] = [];

  constructor(private angularFirestore: AngularFirestore) {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  ngOnInit(): void {
    
    this.dateRangeForm.valueChanges.subscribe(value => {
      const startDate = value.startDate ? this.formatDate(value.startDate) : null;
    const endDate = value.endDate ? this.formatDate(value.endDate) : null;

      if (startDate && endDate) {
        this.angularFirestore.collection('registers', ref => ref
          .where('date', '>=', startDate)
          .where('date', '<=', endDate)
        ).valueChanges().subscribe(data => {
          this.filteredData = data;
        });
      }
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }



  generateReport(): void {
    const doc = new jsPDF();
    // Add your data to the PDF here. The exact method will depend on the content of the data.
    doc.text(JSON.stringify(this.filteredData), 10, 10);
    doc.save('report.pdf');
  }
}
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';



import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { MatDialog } from '@angular/material/dialog';

import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { Subscription } from 'rxjs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormsModule } from '@angular/forms';


@Component({
  
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe, 
    MatTableModule, MatPaginator, MatIconModule,FormsModule],
  templateUrl: './register-generate-report.component.html',
  animations: [fadeAnimation],
  styleUrl: './register-generate-report.component.scss',
})
export class RegisterGenerateReportComponent implements OnInit, AfterViewInit{
  startDate!: string;
  endDate!: string;
  originalData: any[] = []; // Asume que aquí tienes tus datos originales
  filteredData: any[] = []; // Datos que se mostrarán en la tabla
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  private registersSubscription?: Subscription;
  $registers: Register[] = [];

  displayedColumns: string[] = ['title', 'description', 'date', 'actions'];
  dataSource = new MatTableDataSource<Register>(this.$registers);

  convertDate(dateString: string): Date {
    return new Date(dateString);
  }

  applyFilter() {
    this.filteredData = this.originalData.filter(item => {
      const itemDate = this.convertDate(item.date);
      const startDate = this.convertDate(this.startDate);
      const endDate = this.convertDate(this.endDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
    this.dataSource.data = this.filteredData;
  }

  generateReporte() {
    const table = document.getElementById('table');
    const pdf: any = new jsPDF();
  
    pdf.autoTable({
      html: '#table',
      willDrawCell: (cell: any) => {
        if (cell.column.index === 3) { // columna de acciones
          cell.cell.text = ''; // oculta el contenido de la celda
        }
      }
    });
  
    pdf.save('registers_report.pdf');
  }
}
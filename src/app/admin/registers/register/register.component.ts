import { Component, OnInit, AfterViewInit, ViewChild,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { RegisterAddModalComponent } from '../register-add-modal/register-add-modal.component';
import { RegisterDetailModalComponent } from '../register-detail-modal/register-detail-modal.component';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { MatDialog } from '@angular/material/dialog';

import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe, 
    MatTableModule, MatPaginator, MatIconModule,FormsModule],
  templateUrl: './register.component.html',
  animations: [fadeAnimation],
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, AfterViewInit{
  private registersSubscription?: Subscription;
  $registers: Register[] = [];
  startDate!: string;
  endDate!: string;
  originalData: any[] = []; 
  filteredData: any[] = []; 
  displayedColumns: string[] = ['title', 'description', 'date', 'actions'];
  dataSource = new MatTableDataSource<Register>(this.$registers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paginatorIntl: MatPaginatorIntl,
    private router: Router,
    public dialog: MatDialog,
    private registersService: RegistersService,
    private firestore: AngularFirestore
  ) {
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

  ngOnInit(): void {
    this.getRegisters();
    
  }

  async getRegisters() {
    try {
      const registers = await this.registersService.getRegisters();
      this.originalData = registers;
      this.dataSource.data = registers;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(RegisterAddModalComponent, {
      width: '700px',
      data: {}
  });
  }

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



  openDetailsRegisterModal(register: Register) {
    const dialogRef = this.dialog.open(RegisterDetailModalComponent, {
      width: '700px',
      data: { register: register }
    });
    dialogRef.componentInstance.changesSaved.subscribe(() => {
      console.log('Changes saved');
      this.getRegisters();
    });
  }

  deleteRegister() {
    console.log('Deleting register');
  }

  viewOnMap() {
    this.router.navigate(['/admin/map']);
  }

}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


import { RegisterAddModalComponent } from '../register-add-modal/register-add-modal.component';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { MatDialog } from '@angular/material/dialog';

interface Register{
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe, 
    MatTableModule, MatPaginator, MatIconModule],
  templateUrl: './register.component.html',
  animations: [fadeAnimation],
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, AfterViewInit{

  $registers: Register[] = [];

  displayedColumns: string[] = ['title', 'description', 'date', 'actions'];
  dataSource = new MatTableDataSource<Register>(this.$registers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paginatorIntl: MatPaginatorIntl,
    private router: Router,
    public dialog: MatDialog,
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
    this.generateTestRegisters();
  }

  openModal() {
    const dialogRef = this.dialog.open(RegisterAddModalComponent, {
      width: '700px',
      data: {}
  });
  }


  async generateTestRegisters(): Promise<void> {
    for (let i = 0; i < 258; i++) {
      this.$registers.push({
        title: `Registro ${i + 1}`,
        description: `Descripción del registro ${i + 1}`,
        date: this.dateToString(new Date())
      });
    }
    this.dataSource.data = this.$registers;
  }

  dateToString(date: Date): string {
    return date.toISOString();
  }

  deleteRegister() {
    console.log('Deleting register...');
  }

  editRegister() {
    console.log('Editing register...');
  }

  viewOnMap() {
    this.router.navigate(['/admin/map']);
  }

  generateReport() {
    console.log('Generating report...');
  }

}

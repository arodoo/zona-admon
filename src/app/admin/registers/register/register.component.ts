import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe,
    MatTableModule, MatPaginator, MatIconModule],
  templateUrl: './register.component.html',
  animations: [fadeAnimation],
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  private registersSubscription?: Subscription;
  $registers: Register[] = [];

  displayedColumns: string[] = ['title', 'description', 'date', 'actions'];
  dataSource = new MatTableDataSource<Register>(this.$registers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paginatorIntl: MatPaginatorIntl,
    private router: Router,
    public dialog: MatDialog,
    private registersService: RegistersService,
    private firestore: AngularFirestore,
    private notificationService: NotificationService
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

  openModal() {
    const dialogRef = this.dialog.open(RegisterAddModalComponent, {
      width: '700px',
      data: {}
    });
  }

  async getRegisters() {
    this.registersSubscription = this.firestore.collection<Register>('registers',
      ref => ref.where('active', '==', true)
        .orderBy('date', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  openDetailsRegisterModal(register: Register) {
    const dialogRef = this.dialog.open(RegisterDetailModalComponent, {
      width: '700px',
      data: { register: register }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
      }
    });
  }

  deleteRegister() {
    console.log('Deleting register...');
  }

  viewOnMap(register: Register) {
    this.notificationService.confirmDialog('Estás a punto de abandonar esta página, ¿estás seguro?').then((result) => {
      if (result === true) {
        const registerString = JSON.stringify(register);
        this.router.navigate(['/admin/map'],
          { queryParams: { register: registerString } });
      }
    });
  }

  generateReport() {
    console.log('Generating report...');
  }

}

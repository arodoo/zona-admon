import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { RegisterAddModalComponent } from '../register-add-modal/register-add-modal.component';
import { RegisterDetailModalComponent } from '../register-detail-modal/register-detail-modal.component';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { MatDialog } from '@angular/material/dialog';
import { Alignment } from 'pdfmake/interfaces';
import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa esto si también estás utilizando el plugin autoTable
import { Timestamp } from '@angular/fire/firestore';
import { logoBase64 } from '../../../../assets/logoBase64'; // Asegúrate de que la ruta sea correcta

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppTitleComponent, DateFormatPipe,
    MatTableModule, MatPaginator, MatIconModule, FormsModule],
  templateUrl: './register.component.html',
  animations: [fadeAnimation],
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  private registersSubscription?: Subscription;
  $registers: Register[] = [];
  startDate!: string;
  endDate!: string;
  originalData: any[] = []; // Asume que aquí tienes tus datos originales
  filteredData: any[] = []; // Datos que se mostrarán en la tabla
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
    const startDate = new Date(this.startDate).toISOString();
    const endDate = new Date(this.endDate).toISOString();

    //console.log('Start Date:', startDate);
    //console.log('End Date:', endDate);

    this.firestore.collection('registers', ref => ref
      .where('active', '==', true)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
    ).get().subscribe(async querySnapshot => {
      this.filteredData = querySnapshot.docs.map(doc => doc.data());

      //console.log('Filtered Data:', this.filteredData);

      if (this.filteredData && this.filteredData.length > 0) {
        // Crear filas para cada registro, con cada detalle en una nueva fila
        const tableBody = this.filteredData.map((item) => {
          const baseRows = [
            [{ text: 'Título', style: 'tableHeader' }, { text: item.title, colSpan: 5, style: 'tableHeader' }, {}, {}, {}, {}],
            [{ text: 'Descripción', }, { text: item.description || '', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Fecha', }, { text: item.date || '', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Latitud', }, { text: item.latitud || '', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Longitud', }, { text: item.longitud || '', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Defunciones', }, { text: item.defussions || '', colSpan: 5 }, {}, {}, {}, {}],
            [{ text: 'Heridos', }, { text: item.hurts || '', colSpan: 5 }, {}, {}, {}, {}],
          ];

          // Añadir fila para las imágenes, todas las URLs en una sola celda
          let imagesCell;
          if (item.images && item.images.length > 0) {
            imagesCell = item.images.filter((url: any) => url).map((imageUrl: any) => {
              return { text: 'Ver Imagen', link: imageUrl, decoration: 'underline', color: 'blue' };
            });
          } else {
            // Manejar el caso de que no haya imágenes
            imagesCell = [{ text: 'No hay imágenes disponibles' }];
          }

          const imageRow = [
            { text: 'Imágenes', colSpan: 1 },
            { stack: imagesCell, colSpan: 5 }, {}, {}, {}, {}
          ];

          // Agregar una fila vacía para el espacio en blanco
          const emptyRow = [{ text: '', colSpan: 6, margin: [0, 10] }, {}, {}, {}, {}, {}];

          return [...baseRows, imageRow, emptyRow]; // Espacio entre registros
        }).flat();

        // Ruta de la imagen del logo en base64
        const logo = ''; // Reemplaza con tu imagen en base64

        const docDefinition = {
          content: [
            {
              image: logoBase64,
              width: 35,
              alignment: 'right' as any,
              margin: [0, 0, 0, 0] as [number, number, number, number]
            },
            {
              table: {
                widths: [100, '*', '*', '*', '*', '*'],
                body: tableBody
              },
              layout: 'Borders',
            },
          ],
          styles: {
            tableHeader: {
              fillColor: '#3F51B5', // Azul
              color: 'white',
              bold: true,
              fontSize: 12,
            }
          },
          pageMargins: [40, 20, 40, 20] as [number, number, number, number], // Ajusta los márgenes de la página
        };

        pdfMake.createPdf(docDefinition).download('registers_report.pdf');
      } else {
        console.error('No hay datos disponibles para generar el reporte.');
      }
    }, error => {
      console.error('Error al obtener los datos de Firestore:', error);
    });
}
  async getRegisters() {
    this.registersSubscription = this.firestore.collection<Register>('registers',
      ref => ref.where('active', '==', true)
        .orderBy('date', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.originalData = data;
        this.dataSource.data = data;
        //console.log(data);
      });
  }

  openDetailsRegisterModal(register: Register) {
    const dialogRef = this.dialog.open(RegisterDetailModalComponent, {
      width: '700px',
      data: { register: register }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log('The dialog was closed');
      }
    });
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



  viewDetails() {
    console.log('Viewing details...');
  }

}
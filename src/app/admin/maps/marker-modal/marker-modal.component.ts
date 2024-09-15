import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { MarkerDetailModalComponent } from '../marker-detail-modal/marker-detail-modal.component';

import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-marker-modal',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './marker-modal.component.html',
  styleUrl: './marker-modal.component.scss'
})
export class MarkerModalComponent implements OnInit{

  title: string;
  position: string;
  id: string;

  register: Register = {
    id: '',
    title: '',
    description: '',
    latitud: '',
    longitud: '',
    date: '',
    active: false,
    images: [],
    user_id: ''
  }

  constructor(
    public dialogRef: MatDialogRef<MarkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private registersService: RegistersService,
    public dialog: MatDialog,
  ) {
    // Asignar los datos pasados al modal a las propiedades locales
    this.title = data.title;
    this.position = data.position;
    this.id = data.id;
  }

  async ngOnInit(): Promise<void> {
    const loadedRegister = await this.registersService.getRegisterById(this.id);
    this.register = loadedRegister;
    console.log(this.register);
  }

  openDetailsRegisterModal(register: Register) {
    const dialogRef = this.dialog.open(MarkerDetailModalComponent, {
      width: '700px',
      data: { register: register }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log('The dialog was closed');
        
      }
    });
  }



  close(): void {
    this.dialogRef.close();
  }
}

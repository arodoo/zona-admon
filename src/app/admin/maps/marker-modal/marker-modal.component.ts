import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { RegistersService } from '../../../core/services/registers.service';
import { Register } from '../../../core/models/register.interface';
import { RegisterDetailModalComponent } from '../../registers/register-detail-modal/register-detail-modal.component';

@Component({
  selector: 'app-marker-modal',
  standalone: true,
  imports: [],
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



  close(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<MarkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Asignar los datos pasados al modal a las propiedades locales
    this.title = data.title;
    this.position = data.position;
  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  close(): void {
    this.dialogRef.close();
  }
}

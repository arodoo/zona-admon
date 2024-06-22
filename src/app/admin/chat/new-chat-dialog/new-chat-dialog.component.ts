import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-new-chat-dialog',
  imports: [
    
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `

<h1 style="text-align: center; color: #34b7f1; font-size: 2em; margin-bottom: 1em;">Nuevo grupo de chat</h1>
<div>
  <mat-form-field style="width: 100%; margin-bottom: 1em;">
    Nombre del grupo:
    <input matInput placeholder="Nombre del grupo" [(ngModel)]="name" required style="border: 1px solid #ddd; border-radius: 4px; padding: 0.5em;">
  </mat-form-field>
  Ingresa una foto para el grupo
  <mat-form-field style="width: 100%; margin-bottom: 1em;">
  <input matInput placeholder="URL de la imagen" [(ngModel)]="imgUrl" style="border: 1px solid #ddd; border-radius: 4px; padding: 0.5em;">

  </mat-form-field>
  <mat-form-field style="width: 100%; margin-bottom: 1em;">
    Añade los miembros:
    <input matInput placeholder="Miembros" [(ngModel)]="members" style="border: 1px solid #ddd; border-radius: 4px; padding: 0.5em;">
  </mat-form-field>
</div>
<div mat-dialog-actions style="justify-content: space-between; padding: 1em 0;">
  <button mat-button (click)="onCancel()" style="color: #fff; background-color: #34b7f1; padding: 0.5em 1em; border-radius: 4px; font-weight: bold;">Cancelar</button>
  <button mat-button (click)="onSubmit()" style="color: #fff; background-color: #34b7f1; padding: 0.5em 1em; border-radius: 4px; font-weight: bold;">Crear</button>
</div>

  `,
  styles: []
})
export class NewChatDialogComponent {
  name: string = '';
  imgUrl: string = '';
  members: string = '';

  constructor(public dialogRef: MatDialogRef<NewChatDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ name: this.name, imgUrl: this.imgUrl, members: this.members });
  }
}
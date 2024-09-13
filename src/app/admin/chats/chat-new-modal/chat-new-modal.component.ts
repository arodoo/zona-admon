import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-new-chat-modal', // Cambiado a 'app-new-chat-modal'
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './chat-new-modal.component.html',
  styleUrls: ['./chat-new-modal.component.scss']
})

export class NewChatDialogComponent {
  name: string = '';
  imgUrl: string = '';
  members: string = '';

  constructor(public dialogRef: MatDialogRef<NewChatDialogComponent>, private storage: AngularFireStorage) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ name: this.name, imgUrl: this.imgUrl, members: this.members });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `chatImages/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgUrl = url; // Actualiza la propiedad imgUrl con la URL de la imagen
            //console.log("URL de la imagen:", url);
          });
        })
      ).subscribe();
    }
  }
}

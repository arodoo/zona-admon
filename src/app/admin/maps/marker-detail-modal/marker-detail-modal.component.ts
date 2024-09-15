import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Register } from '../../../core/models/register.interface';
import { RegistersService } from '../../../core/services/registers.service';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';

import { NgxLoadingModule } from 'ngx-loading';

import { EnlargedImageComponent } from '../../../shared/components/enlarged-image/enlarged-image.component';
declare const google: any;

@Component({
  selector: 'app-marker-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule,
    NgxLoadingModule],
  providers: [DatePipe],
  templateUrl: './marker-detail-modal.component.html',
  styleUrl: './marker-detail-modal.component.scss'
})
export class MarkerDetailModalComponent implements OnInit {
  @Output() changesSaved = new EventEmitter<boolean>();

  registerForm: FormGroup;
  isEditMode = false;

  imagesToDelete: string[] = [];
  newImages: File[] = [];

  selectedImageFile: File | null = null;


  map: any;
  marker: any = null;

  loading: boolean = false;

  userName: string = '';

  constructor(public dialogRef: MatDialogRef<MarkerDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { register: Register },
    private usersService: UsersService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.registerForm = new FormGroup({
      id: new FormControl(data.register.id),
      title: new FormControl(data.register.title, [Validators.required]),
      description: new FormControl(data.register.description, [Validators.required]),
      date: new FormControl(data.register.date, [Validators.required]),
      images: new FormControl(data.register.images),
      latitud: new FormControl(data.register.latitud, [Validators.required]),
      longitud: new FormControl(data.register.longitud, [Validators.required]),
      active: new FormControl(data.register.active),
      user_id: new FormControl(data.register.user_id),
    });
  }

  ngOnInit(): void {
    this.formatDate();
    this.getUserName();
  }



  markImageForDeletion(imageUrl: string) {
    const index = this.imagesToDelete.indexOf(imageUrl);
    if (index > -1) {
      this.imagesToDelete.splice(index, 1); //En caso de estar marcada, se desmarca
    } else {
      this.imagesToDelete.push(imageUrl); //
    }
  }

  onSelectNewImages(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.newImages.push(...Array.from(fileList))
    }
  }

  formatDate() {
    const date = this.datePipe.transform(this.data.register.date, 'yyyy-MM-dd');
    this.registerForm.get('date')?.setValue(date);
  }

  getUserName() {
    this.usersService.getUserData(this.data.register.user_id).subscribe((user) => {
      if (user) {
        this.userName = user.name;
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }


  enlargeImage(imageUrl: string) {
    this.dialog.open(EnlargedImageComponent, {
      data: { imageUrl },
      width: '70%',
    });
  }
}

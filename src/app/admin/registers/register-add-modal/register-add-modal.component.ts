import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Register } from '../../../core/models/register.interface';
import { UsersService } from '../../../core/services/users.service';
import { UserCredential } from '@angular/fire/auth';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register-add-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-add-modal.component.html',
  styleUrl: './register-add-modal.component.scss'
})
export class RegisterAddModalComponent {

  register: Register = {
    title: '',
    description: '',
    date: '',
    uid: '',
    active: false,
    latitud: '',
    longitud: '',
    images: [],
    user_id: ''
  };
  isEditMode = false;

  registerForm: FormGroup;

  selectedImageFiles: File[] | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageSelected: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {
    this.registerForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

}

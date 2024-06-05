import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Register } from '../../../core/models/register.interface';
import { RegistersService } from '../../../core/services/registers.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register-detail-modal.component.html',
  styleUrl: './register-detail-modal.component.scss'
})
export class RegisterDetailModalComponent implements OnInit {

  registerForm: FormGroup;
  isEditMode = false;
  selectedImageFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<RegisterDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { register: Register },
    private registerService: RegistersService,
    private notificationService: NotificationService
  )
  {
    this.registerForm = new FormGroup({
      title: new FormControl(data.register.title, [Validators.required]),
      description: new FormControl(data.register.description, [Validators.required]),
      date: new FormControl(data.register.date, [Validators.required]),
      images: new FormControl(data.register.images),
    });
  }

  ngOnInit(): void {
  }

}

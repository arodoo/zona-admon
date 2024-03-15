import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserData } from '../../../core/models/userData.interface';
import { User } from '../../../core/models/user.interface';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-registration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration-modal.component.html',
  styleUrl: './user-registration-modal.component.scss'
})
export class UserRegistrationModalComponent {

  user: User = {
    email: '',
    password: '',
  };
  userData: UserData = {
    uid: '0',
    imgUrl: '',
    name: '',
    email: '',
    role: '',
    organisation: '',
    registered: '',
  };
  isEditMode = false;

  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserRegistrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {

    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userData: new FormGroup({
        uid: new FormControl('0'),
        imgUrl: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', [Validators.required]),
        organisation: new FormControl('', [Validators.required]),
        registered: new FormControl(''),
      })
    });

    if (data.user) {
      this.user = data.user;
      this.isEditMode = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async registerOrUpdateUser() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
    } if (this.userData.uid !== '0') {
      const result = await this.authService.updateUserData(this.userData.uid, this.userData);

    } else {
      const result = await this.authService.signUp(this.user.email, this.user.password, this.userData);
      if (result) {
        console.log('Usuario registrado correctamente');
      }
    }
  }
}
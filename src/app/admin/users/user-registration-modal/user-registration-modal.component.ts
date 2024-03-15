import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { UserData } from '../../../core/models/userData.interface';
import { User } from '../../../core/models/user.interface';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-registration-modal',
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationModalComponent>,
    private authService: AuthService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async registerUser() {
    try {
      const result = await this.authService.signUp(this.user.email, this.user.password, this.userData);
      if (result) {
        console.log('User created', result);
        this.dialogRef.close();
      } else {
        console.log('User not created', result);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }
}


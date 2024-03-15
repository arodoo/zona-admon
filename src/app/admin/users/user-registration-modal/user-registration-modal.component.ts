import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserData } from '../../../core/models/userData.interface';
import { User } from '../../../core/models/user.interface';

import { AuthService } from '../../../core/services/auth.service';
import { UserCredential } from '@angular/fire/auth';

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
    role: '',
    organization: '',
    registered: '',
  };
  isEditMode = false;

  userForm: FormGroup;

  selectedImageFile: File | null = null;

  
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
        name: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        organization: new FormControl('', [Validators.required]),
        registered: new FormControl(new Date().toISOString()),
        imgUrl: new FormControl('')
      })

    });

    if (data.user) {
      this.user = data.user;
      this.isEditMode = true;
      this.userForm.patchValue({
        email: this.user.email,
        userData:{
          uid: this.userData.uid,
          name: this.userData.name,
          role: this.userData.role,
          organization: this.userData.organization
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImageFile = input.files[0];
    }
  }



  async registerOrUpdateUser() {
    //console.log('Registrando usuario:', this.userForm.value);
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const email = formValue.email;
      const password = formValue.password;
      
      const userData = formValue.userData;
      
      try {
        if (this.isEditMode) {
          console.log('Actualizando usuario:');
        } else {
          const credential = await this.authService.signUp(email, password, userData) as UserCredential;
          if (credential.user) {
            const uid = credential.user.uid;
            if (this.selectedImageFile) {
              const downloadURL = await this.authService.uploadImage(uid, this.selectedImageFile);
              const result = await this.authService.saveUserData(uid, { ...userData, imgUrl: downloadURL });
              if (result) {
                console.log('Usuario registrado correctamente', credential.user);
              } else {
                console.error('Error al registrar el usuario');
              }
            }
          }
        }
        this.dialogRef.close(); // Cerramos el modal después de la operación
      } catch (error) {
        console.error('Error en el registro o actualización del usuario:', error);
      }
    } else {
      console.error('El formulario no es válido');
    }
  }



}
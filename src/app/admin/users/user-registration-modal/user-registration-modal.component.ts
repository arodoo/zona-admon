import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


import { UserData } from '../../../core/models/userData.interface';
import { UsersService } from '../../../core/services/users.service';
import { UserCredential } from '@angular/fire/auth';
import { Roles } from '../../../core/models/roles.interface';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-user-registration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration-modal.component.html',
  styleUrl: './user-registration-modal.component.scss'
})

//Tim Berners Lee
export class UserRegistrationModalComponent {

  userData: UserData = {
    uid: '0',
    active: true,
    imgUrl: '',
    name: '',
    roles: [
      { type: 'VISUALIZER', active: true }
    ],
    organization: '',
    registered: '',
    email: ''
  };
  isEditMode = false;

  userForm: FormGroup;

  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageSelected: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<UserRegistrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {

    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userData: new FormGroup({
        uid: new FormControl('0'),
        name: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ]),
        roles: new FormControl('', [Validators.required]),
        organization: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ]),
        registered: new FormControl(new Date().toISOString()),
        imgUrl: new FormControl(''),
        email: new FormControl(''),
        active: new FormControl()
      })
    });
    this.imagePreview = 'assets/img/no-image-selected.png';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.selectedImageFile = input.files[0];
      this.imageSelected = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async register() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const email = formValue.email;
      const password = formValue.password;

      const userData = formValue.userData;
      userData.email = email;
      userData.active = true;
      userData.roles = this.assignRoles(userData.roles);

      try {
        if (this.isEditMode) {
        } else {
          const credential = await this.usersService.registerUser(email, password, userData) as UserCredential;
          if (credential.user) {
            const uid = credential.user.uid;
            if (this.selectedImageFile) {
              const downloadURL = await this.usersService.uploadImage(uid, this.selectedImageFile);
              const result = await this.usersService.saveUserData(uid, { ...userData, imgUrl: downloadURL });
              if (result) {
                this.notificationService.showSuccess('Usuario registrado correctamente');
              } else {
                this.notificationService.showError('Error al registrar el usuario');
              }
            }
          }
        }
        this.dialogRef.close();
      } catch (error) {
        console.error('Error en el registro o actualización del usuario:', error);
      }
    } else {
      console.error('El formulario no es válido');
    }
  }

  assignRoles(selectedRole: 'ADMIN' | 'EDITOR' | 'VISUALIZER'): Roles[] {
    return [{ type: selectedRole, active: true }];
  }


}
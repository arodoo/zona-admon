import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../../core/models/userData.interface';

import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Roles } from '../../../core/models/roles.interface';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss'
})
export class UserEditModalComponent implements OnInit {

  userForm: FormGroup;
  isEditMode = true;
  selectedImageFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserData },
    private router: Router,
    private userSevice: UsersService,
    private notificationService: NotificationService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl(data.user.email, [Validators.required, Validators.email]),
      userData: new FormGroup({
        uid: new FormControl(data.user.uid),
        name: new FormControl(data.user.name, [Validators.required]),
        roles: new FormControl(data.user.roles, [Validators.required]),
        organization: new FormControl(data.user.organization, [Validators.required]),
        registered: new FormControl(data.user.registered),
        imgUrl: new FormControl(data.user.imgUrl),
      })
    });
  }

  ngOnInit(): void {
    console.log(this.data.user);
    const activeRole = this.data.user.roles.find(role => role.active);
    if (activeRole) {
      this.setRole(activeRole.type); // Asegúrate de que setRole establece un arreglo
    }
    const imgUrl = this.data.user.imgUrl;
  }

  //methos to update user data only
  async update() {
    const userData = this.userForm.get('userData')?.value;
    userData.roles = this.assignRoles(userData.roles);
    try {
      await this.userSevice.updateUserData(userData.uid, userData);
      this.notificationService.showSuccess('Usuario actualizado correctamente');
      this.dialogRef.close();
      window.location.reload();
      this.router.navigate(['/admin/users']);
    } catch (error) {
      this.notificationService.showError('Error al actualizar el usuario');
    }
  }

  setRole(role: 'ADMIN' | 'EDITOR' | 'VISUALIZER'): void {
    this.userForm.get('userData.roles')?.setValue(this.getRole(role));
  }

  getRole(role: 'ADMIN' | 'EDITOR' | 'VISUALIZER'): Roles[] {
    const roles = this.userForm.get('userData.roles')?.value;
    const activeRole = roles.find((role: Roles) => role.active);
    return activeRole.type;
  }

  assignRoles(selectedRole: 'ADMIN' | 'EDITOR' | 'VISUALIZER'): Roles[] {
    //deactivate other roles and activate the selected one
    if (selectedRole === 'ADMIN') {
      return [
        { type: 'ADMIN', active: true },
        { type: 'EDITOR', active: false },
        { type: 'VISUALIZER', active: false }
      ];
    } else if (selectedRole === 'EDITOR') {
      return [
        { type: 'ADMIN', active: false },
        { type: 'EDITOR', active: true },
        { type: 'VISUALIZER', active: false }
      ];
    } else if (selectedRole === 'VISUALIZER') {
      return [
        { type: 'ADMIN', active: false },
        { type: 'EDITOR', active: false },
        { type: 'VISUALIZER', active: true }
      ];
    } else {
      return [];
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      // Aquí puedes implementar la lógica para subir el archivo
      // Por ejemplo, actualizar la propiedad 'selectedImageFile' y luego subir la imagen
      this.selectedImageFile = file;
    }
  }

}

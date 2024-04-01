import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '@angular/fire/auth';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { UserRegistrationModalComponent } from '../user-registration-modal/user-registration-modal.component';
import { UserData } from '../../../core/models/userData.interface';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent implements OnInit{

  $users!: Observable<UserData[]>;


  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private userService: UsersService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.$users = this.firestore.collection<UserData>('users', ref => ref.where('active', '==', true)).valueChanges();
  }


  getRoleInSpanish(role: string): string {
    const rolesMap: { [key: string]: string } = {
      'ADMIN': 'Administrador',
      'EDITOR': 'Editor',
      'VISUALIZER': 'Usuario'
    };

    return rolesMap[role.toUpperCase()] || role;
  }


  openModal(userToAdd?: User) {
    const dialogRef = this.dialog.open(UserRegistrationModalComponent, {
      width: '700px',
      data: { user: userToAdd }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openEditModal(userData: UserData) {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '700px',
      data: { user: userData }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  async deleteUser(userId: string) {
    const confirmation = await this.notificationService.confirmDialog('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmation) {
      const result = await this.userService.deleteUser(userId).then(() => {
      this.notificationService.showSuccess('Usuario eliminado correctamente');
      }).catch((error) => {
        this.notificationService.showError('Error al eliminar el usuario');
      });
    }
    else {
      this.notificationService.showError('Error al eliminar el usuario');
    }
  }

  editUser(userId: string) {
    console.log('Edit user with id: ', userId);
  }

}

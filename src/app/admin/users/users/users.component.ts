import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';


import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '@angular/fire/auth';

import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { UserRegistrationModalComponent } from '../user-registration-modal/user-registration-modal.component';
import { UserData } from '../../../core/models/userData.interface';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { AppTitleComponent } from '../../../shared/components/app-title/app-title.component';

import { fadeAnimation } from '../../../shared/animations/fade-animation';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFormatPipe, AppTitleComponent, MatTableModule, MatPaginator],
  templateUrl: './users.component.html',
  animations: [fadeAnimation],
  styleUrl: './users.component.scss'
})


export class UsersComponent implements OnInit, AfterViewInit {
  private usersSubscription?: Subscription;
  $users!: Observable<UserData[]>;

  displayedColumns: string[] = ['user', 'function', 'role', 'registered', 'actions'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private userService: UsersService,
    private notificationService: NotificationService,
    private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      window.scrollTo(0, 0);
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.usersSubscription = this.firestore.collection<UserData>('users',
      ref => ref.where('active', '==', true)
        .orderBy('registered', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.dataSource.data = data;
      });
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

}

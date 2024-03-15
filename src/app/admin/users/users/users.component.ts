import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from '@angular/fire/auth';

import { UserRegistrationModalComponent } from '../user-registration-modal/user-registration-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(public dialog: MatDialog) { }

  usersArray = [
    {
      uid: 1,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'John Doe',
      email: 'example.com',
      role: 'Admin',
      organization: 'Cruz roja',
      registered: '01/01/2021',
    },
    {
      uid: 12,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      organization: 'Red Cross',
      registered: '02/05/2021',
    },
    {
      uid: 13,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'User',
      organization: 'Doctors Without Borders',
      registered: '03/15/2021',
    },
    {
      uid: 14,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Bob Brown',
      email: 'bob@example.com',
      role: 'User',
      organization: 'UNICEF',
      registered: '04/20/2021',
    },
    {
      uid: 15,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Emily Jones',
      email: 'emily@example.com',
      role: 'User',
      organization: 'Save the Children',
      registered: '05/25/2021',
    }
  ];

  openModal(userToEdit?: User) {
    const dialogRef = this.dialog.open(UserRegistrationModalComponent, {
      width: '500px',
      data: { user: userToEdit }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  editUser(userId: number) {
    console.log('Edit user with id: ', userId);
  }

}

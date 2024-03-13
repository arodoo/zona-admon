import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  usersArray = [
    {
      uid: 1,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'John Doe',
      email: 'example.com',
      role: 'Admin',
      organisation: 'Cruz roja',
      registered: '01/01/2021',
    },
    {
      uid: 12,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      organisation: 'Red Cross',
      registered: '02/05/2021',
    },
    {
      uid: 13,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'User',
      organisation: 'Doctors Without Borders',
      registered: '03/15/2021',
    },
    {
      uid: 14,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Bob Brown',
      email: 'bob@example.com',
      role: 'User',
      organisation: 'UNICEF',
      registered: '04/20/2021',
    },
    {
      uid: 15,
      imgUrl: 'https://via.placeholder.com/150',
      name: 'Emily Jones',
      email: 'emily@example.com',
      role: 'User',
      organisation: 'Save the Children',
      registered: '05/25/2021',
    }
  ];

  editUser(userId: number) {
    console.log('Edit user with id: ', userId);
  }

}

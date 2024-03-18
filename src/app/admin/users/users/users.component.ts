import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from '@angular/fire/auth';

import { UserRegistrationModalComponent } from '../user-registration-modal/user-registration-modal.component';
import { Observable } from 'rxjs';
import { UserData } from '../../../core/models/userData.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  $users!: Observable<UserData[]>;

  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.$users = this.firestore.collection<UserData>('users').valueChanges();

  }


  openModal(userToEdit?: User) {
    const dialogRef = this.dialog.open(UserRegistrationModalComponent, {
      width: '500px',
      data: { user: userToEdit }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



  editUser(userId: string) {
    console.log('Edit user with id: ', userId);
  }

}

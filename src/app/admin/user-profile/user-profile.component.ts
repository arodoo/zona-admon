import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../core/services/users.service';
import { AuthService } from '../../core/services/auth.service';
import { UserData } from '../../core/models/userData.interface';
import { Roles } from '../../core/models/roles.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userUid: string = '';
  userData: UserData = {} as UserData;

  constructor(private usersService: UsersService, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.getCurrentUserData();

  }

  getCurrentUserData() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userUid = user.uid;
        console.log(this.userUid);
        this.usersService.getUserData(user.uid).subscribe(data => {
          if (data) {
            this.userData = data;
            console.log(this.userData);
          }
        });
      }
    });
  }

  getRolesText(roles: Roles[] | undefined | null) {
    if (!roles) {
      return '';
    }
    return roles.filter(role => role.active).map(role => role.type).join(', ');
  }

}

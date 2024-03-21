import { Component } from '@angular/core';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public authService: AuthService,
    private router: Router,
    private userService: UsersService) { }

  signOut() {
    try {
      this.authService.signOut();
      if (this.authService.user$!){
        this.router.navigate(['/']);
      }
    } catch (error) {
      
    }
  }

}

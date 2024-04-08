import { Component } from '@angular/core';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';

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
    private userService: UsersService,
    private notificationService: NotificationService) { }

  signOut() {
    this.notificationService.confirmDialog('¿Estás seguro de querer cerrar sesión?').then((result) => {
      if (result === true) {

        try {
          this.authService.signOut();
          if (this.authService.user$!) {
            this.notificationService.showSuccess('Sesión cerrada con éxito');
            this.router.navigate(['/']);
          }
        } catch (error) {
          this.notificationService.showError('Error al cerrar sesión');
        }
      } else {
        return;
      }
    }
    )
  };
}

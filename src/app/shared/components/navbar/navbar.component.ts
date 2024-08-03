import { Component } from '@angular/core';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { NotificationService } from '../../../core/services/notification.service';

import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    NgxLoadingModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  loading: boolean = false;

  constructor(public authService: AuthService,
    private router: Router,
    private userService: UsersService,
    private notificationService: NotificationService) { }

  async signOut() {
    this.notificationService.confirmDialog('¿Estás seguro de querer cerrar sesión?').then((result) => {
      if (result === true) {
        this.fakeTimeout();
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

  fakeTimeout() {
    this.startLoading();
    this.stopLoading();
  }

  startLoading() {
    this.loading = true;
    //console.log('loading');

  }

  stopLoading() {
    setTimeout(() => {
      this.loading = false;
      console.log('stop loading');
    }, 2000);
  }

}

import { Component } from '@angular/core';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public auth: AuthService,
    private router: Router) { }

  signOut() {
    try {
      this.auth.signOut();
      if(this.auth.user$!){
        this.router.navigate(['/']);
      }
    } catch (error) {
      
    }
  }

}

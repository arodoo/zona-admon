import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatIconModule, MatSidenavModule, MatListModule, MatToolbar],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  menuItems = [
    { name: 'Inicio', route: '/admin/dashboard', icon: 'dashboard', visible: true },
    { name: 'Usuarios', route: '/admin/users', icon: 'people', visible: false }, // Oculto por defecto
    { name: 'Reportes', route: '/admin/reportes', icon: 'reportes', visible: false }, // Oculto por defecto
    { name: 'Registros', route: '/admin/documentos', icon: 'folder_open', visible: true },
  ];

  ngOnInit() {
    this.updateMenuVisibility();
  }

  updateMenuVisibility() {
    this.authService.user$.subscribe(user => {
      if (user) {
        const canDelete = this.authService.canDelete(user);
        this.menuItems = this.menuItems.map(item => {
          if (item.name === 'Usuarios' || item.name === 'Reportes') {
            return { ...item, visible: canDelete };
          }
          return item;
        }
        );
      }
    }
    );
  }
}
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
    { name: 'Inicio', route: '/admin/home', icon: 'dashboard', visible: true },
    { name: 'Mapa', route: '/admin/map', icon: 'map', visible: true },
    { name: 'Usuarios', route: '/admin/users', icon: 'people', visible: false }, // Oculto por defecto
    { name: 'Estadísticas', route: '/admin/statistical-panel', icon: 'insert_chart', visible: true },
    //{ name: 'Reportes', route: '/admin/reports', icon: 'reportes', visible: false }, // Oculto por defecto
    { name: 'Registros', route: '/admin/registers', icon: 'folder_open', visible: true },
    { name: 'Carga masiva', route: '/admin/bulk-data-upload', icon: 'cloud_upload', visible: true }

  ];

  ngOnInit() {
    this.updateMenuVisibility();
  }

  updateMenuVisibility() {
    this.authService.user$.subscribe(user => {
      if (user) {
        const canDelete = this.authService.canDelete(user);
        this.menuItems = this.menuItems.map(item => {
          if (item.name === 'Usuarios' || item.name === 'Reportes' || item.name === 'Statistics') {
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
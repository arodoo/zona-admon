import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatIconModule, MatSidenavModule, MatListModule, MatToolbar],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  menuItems = [
    { name: 'Inicio', route: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Usuarios', route: '/admin/users', icon: 'people' },
    { name: 'Reportes', route: '/admin/reportes', icon: 'reportes' },
    { name: 'Registros', route: '/admin/documentos', icon: 'folder_open' },
  ];

}

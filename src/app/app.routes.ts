import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/login/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

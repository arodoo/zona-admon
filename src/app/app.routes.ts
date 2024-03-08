import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/login/auth.routes').then(m => m.AUTH_ROUTES)
    }
];

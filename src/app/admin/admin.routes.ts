import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { adminGuard } from "../core/admin.guard";
import { MapComponent } from "./maps/map/map.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'map',
                component: MapComponent
            },
            {
                path: 'users',
                loadChildren: () => import('../admin/users/users/users.routes').then(m => m.USERS_ROUTES),
                canActivate: [adminGuard]
            },
        ]
    }
];

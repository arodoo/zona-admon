import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { adminGuard } from "../core/admin.guard";
import { MapComponent } from "./maps/map/map.component";
import { ReportComponent } from "./reports/report/report.component";
import { RegisterComponent } from "./registers/register/register.component";

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
                path: 'reports',
                component: ReportComponent
            },
            {
                path: 'registers',
                component: RegisterComponent
            },
            {
                path: 'users',
                loadChildren: () => import('../admin/users/users/users.routes').then(m => m.USERS_ROUTES),
                canActivate: [adminGuard]
            },
        ]
    }
];

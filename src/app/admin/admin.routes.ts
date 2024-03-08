import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];

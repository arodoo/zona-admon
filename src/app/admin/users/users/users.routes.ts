import { Routes } from "@angular/router";
import { UsersComponent } from "./users.component";

export const USERS_ROUTES: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'new',
        component: UsersComponent
    },
    {
        path: ':id',
        component: UsersComponent
    }
];
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { UserData } from './models/userData.interface';
import { Roles } from './models/roles.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      return authService.isAuthorized(user);
    }
    ),
    tap(isAuthorized => {
      if (!isAuthorized) {
        authService.signOut();
        router.navigate(['/',]);
      }
    }
    )
  );
};

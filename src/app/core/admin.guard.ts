import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map(user => {
      return authService.canDelete(user);
    }
    ),
    take(1),
    tap(canDelete => {
      if (!canDelete) {
        console.error('Acceso denegado');
      }
    })
  );
}
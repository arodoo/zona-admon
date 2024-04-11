import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserData } from '../models/userData.interface';

import { LogsService } from './logs.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<any>;
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private logsService: LogsService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc(`users/${user.uid}`).valueChanges();
        } else {
          return new Observable(observer => observer.next(null));
        }
      }
      )
    );
  }

  async getCurrentUser() {
    return this.afAuth.currentUser;
  }

  async getCurrentUserUid() {
    const user = await this.getCurrentUser();
    return user ? user.uid : null;
  }

  async getCurrentUserEmail() {
    const user = await this.getCurrentUser();
    return user ? user.email : null;
  }

  /*   checkSession() {
      this.checkInterval$.pipe(
        switchMap(() => this.afAuth.authState),
        takeWhile(user => !!user) // Continúa mientras el usuario esté autenticado
      ).subscribe(
        user => {
          if (!user) {
            this.router.navigate(['/login']);
          }
        },
        error => {
          // Manejar errores aquí
        }
      );
    } */

  async signIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credential.user) {
        this.logsService.logRegister(email, true);
        return true;
      }
    } catch (error) {
      this.logsService.logRegister(email, false);
      throw new Error('Error al iniciar sesión, verifique sus credenciales');
    }
    return false;
  }

  //checkIfIsActive() {
  async checkIfIsActive(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const userRef = this.firestore.collection('users').doc(user.uid);
      const doc = await userRef.get().toPromise(); // Convertir a promesa

      if (doc && doc.exists) {
        const data = doc.data() as UserData;
        const isActive = data.active;

        return isActive;
      } else {
        throw new Error('Usuario no encontrado en Firestore');
      }
    } catch (error) {
      console.error('Error al verificar si el usuario está activo:', error);
      throw new Error('Error al verificar si el usuario está activo');
    }
  }



  // Método para cerrar sesión
  async signOut() {
    const email = await this.getCurrentUserEmail();
    if (email) {
      this.logsService.logOutRegister(email);
      await this.afAuth.signOut();
    }
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    this.router.navigate(['/']);
  }

  //Habilidades y autorización
  canRead(user: UserData): boolean {
    const allowed = ['ADMIN', 'EDITOR', 'VISUALIZER'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: UserData): boolean {
    const allowed = ['ADMIN', 'EDITOR'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: UserData): boolean {
    const allowed = ['ADMIN'];
    return this.checkAuthorization(user, allowed);
  }

  isAuthorized(user: UserData): boolean {
    if (!user) return false;
    for (const role of user.roles) {
      if (role.active) {
        return true;
      }
    }
    return false;
  }

  private checkAuthorization(user: UserData, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of user.roles) {
      if (allowedRoles.includes(role.type) && role.active) {
        return true;
      }
    }
    return false;
  }

}

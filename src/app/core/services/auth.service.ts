import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, interval } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { user } from '@angular/fire/auth';

//model
import { UserData } from '../models/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  checkInterval$: Observable<number> = interval(60000); 

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,

    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return of(user);
        } else {
          return of(null);
        }
      })
    );
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

  // Método para registrar un usuario con correo y contraseña
  async signUp(email: string, password: string, userData: UserData) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendEmailVerification();
      if (credential.user) {
        await this.saveUserData(credential.user.uid, userData);
        return credential;
      } else {
        throw new Error('No se pudo registrar el usuario');
      }

    } catch (error) {
      return error;
    }
  }

  async updateUserData(uid: string, userData: UserData) {
    
  }

  async saveUserData(uid: string, userData: UserData) {
    try {
      await this.firestore.collection('users').doc(uid).set({
        uid: uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        organisation: userData.organisation,
        registered: userData.registered
      });
      return true;
    } catch (error) {
      return error;
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async signIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return credential;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      } else {
        console.error('Se produjo un error desconocido', error);
        throw new Error('Se produjo un error desconocido');
      }
    }
  }


  // Método para cerrar sesión
  async signOut() {
    try {
      await this.afAuth.signOut();
      return true;
    } catch (error) {
      return error;
    }
  }

  // Método para enviar un correo de verificación al usuario
  async sendEmailVerification() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        window.alert('Se ha enviado un correo de verificación a tu dirección de email. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.');
      } else {
        window.alert('Error: No hay un usuario para enviar el correo de verificación.');
      }
    } catch (error) {
      window.alert(error);
    }
  }

  // Método para enviar un correo de restablecimiento de contraseña al usuario
  async sendPasswordResetEmail(email: string) {
    try {
      // Envia el correo de restablecimiento con el método de Firebase Auth
      await this.afAuth.sendPasswordResetEmail(email);
      // Muestra un mensaje de éxito
      window.alert('Se ha enviado un correo de restablecimiento de contraseña a tu dirección de email. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para cambiar tu contraseña.');
    } catch (error) {
      // Si hay un error, muestra un mensaje
      window.alert(error);
    }
  }
}

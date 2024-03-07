import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Si hay un usuario, devuelve sus datos
          return of(user);
        } else {
          // Si no hay usuario, devuelve null
          return of(null);
        }
      })
    );
  }

  // Método para registrar un usuario con correo y contraseña
  async signUp(email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendEmailVerification();
      return credential;
    } catch (error) {
      return error;
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async signIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return credential;
    } catch (error) {
      return error;
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
      // Obtiene el usuario actual
      const user = await this.afAuth.currentUser;
      if (user) {
        // Si el usuario no es null, envía el correo de verificación
        await user.sendEmailVerification();
        // Muestra un mensaje de éxito
        window.alert('Se ha enviado un correo de verificación a tu dirección de email. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.');
      } else {
        // Si el usuario es null, muestra un mensaje de error o maneja la situación como consideres necesario
        window.alert('Error: No hay un usuario para enviar el correo de verificación.');
      }
    } catch (error) {
      // Si hay un error, muestra un mensaje
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

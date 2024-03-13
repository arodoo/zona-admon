import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, interval } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  checkInterval$: Observable<number> = interval(60000); // Intervalo de 1 minuto

  constructor(private afAuth: AngularFireAuth,
    //private firestore: AngularFirestore,
    //private logger: NGXLogger
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Ahora puedes acceder a error.message de forma segura
        console.error(error.message);
        // Lanza el error para que pueda ser capturado por el bloque catch de onLogin
        throw error;
      } else {
        // Maneja otros tipos de errores o valores lanzados
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

  // // Función para guardar logs en Firestore
  // saveLog(action: string, details: any): void {
  //   const logEntry = {
  //     timestamp: new Date(),
  //     action: action,
  //     details: details
  //   };
  //   this.firestore.collection('logs').add(logEntry)
  //     .then(() => this.logger.info('Log guardado en Firestore'))
  //     .catch((error: any) => this.logger.error('Error al guardar el log', error));
  // }
}

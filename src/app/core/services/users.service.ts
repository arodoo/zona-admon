import { Injectable } from '@angular/core';
import { UserData } from '../models/userData.interface';
import { Observable, lastValueFrom, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {


  }

getCurrentUserUid() {

}

  async registerUser(email: string, password: string, userData: UserData) {
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

  async getUsers() {
    try {
      const users = this.firestore.collection('users').valueChanges();
      return users;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return error;
    }
  }

  async getUser(uid: string) {
    try {
      const user = this.firestore.collection('users').doc(uid).get();
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return error;
    }
  }


  async saveUserData(uid: string, userData: UserData) {
    try {
      const userRef = this.firestore.collection('users').doc(uid);
      // Si es un nuevo usuario, establecemos todos los datos
      await userRef.set({
        uid: uid,
        name: userData.name,
        roles: userData.roles,
        organization: userData.organization,
        registered: userData.registered,
        imgUrl: userData.imgUrl,
        email: userData.email
      });
      return userRef;
    } catch (error) {
      console.log('Error al guardar los datos del usuario:', error);
      return error;
    }
  }

  async updateUserData(uid: string, userData: UserData) {
    const userRef = this.firestore.collection('users').doc(uid);
    try {
      await userRef.update(userData);
      return userRef;
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      return error;
    }
  }

  async uploadImage(uid: string, file: File): Promise<string> {
    try {
      const filePath = `users/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      await lastValueFrom(task.snapshotChanges());
      const downloadURL = await lastValueFrom(fileRef.getDownloadURL());
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }

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

  async deleteUser(uid: string) {

  }

  async sendEmailVerification() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        window.alert('Se ha enviado un correo de verificación a la dirección porporciona. Por favor, revisar la bandeja de entrada y seguir las instrucciones para verificar la cuenta');
      } else {
        window.alert('Error: No hay un usuario para enviar el correo de verificación.');
      }
    } catch (error) {
      window.alert(error);
    }
  }
}
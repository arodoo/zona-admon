import { Injectable } from '@angular/core';
import { Register } from '../models/register.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {
  }

  async getRegisters() {
    try {
      const registers = this.firestore.collection('registers').valueChanges();
      return registers;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      return error;
    }
  }

  async addRegister(register: Register): Promise<string> {
    try {
      const registerRef = await this.firestore.collection('registers').add(register);
      return registerRef.id;
    } catch (error) {
      console.error('Error al añadir el registro:', error);
      return 'error';
    }
  }

  async updateRegisterImagesField(registerId: string, imagesUrls: string[]) {
    try {
      await this.firestore.collection('registers').doc(registerId).update({ images: imagesUrls });
      return true;
    } catch (error) {
      console.error('Error al actualizar las imágenes del registro:', error);
      return error;
    }
  }

  async uploadImages(images: File[], registerId: string): Promise<string> {
    const storageRef = this.storage.ref(`registers/${registerId}`);
    let imagesUrls = '';
    for (const image of images) {
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image).then(async snapshot => {
        imagesUrls += await snapshot.ref.getDownloadURL() + ',';
      });
    }
    return imagesUrls;
  }
}

import { Injectable } from '@angular/core';
import { Register } from '../models/register.interface';
import { Observable, lastValueFrom, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {
  }

  async addRegister(register: Register) {
    try {
      const registerRef = await this.firestore.collection('registers').add(register);
      return registerRef.id;
    } catch (error) {
      console.error('Error al añadir el registro:', error);
      return error;
    }
  }

  async uploadImages(images: File[], registerId: string) {
    try{
      const promises = images.map((image) => {
        const path = `registers/${registerId}/${image.name}`;
        const ref = this.storage.ref(path);
        return ref.put(image);
      });
      return await Promise.all(promises);
    }catch(error){
      console.error('Error al subir las imágenes:', error);
      return error;
    }
  }
}

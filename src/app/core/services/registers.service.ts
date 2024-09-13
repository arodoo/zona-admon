import { Injectable } from '@angular/core';
import { Register } from '../models/register.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { firstValueFrom } from 'rxjs';

import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {
  }

  async getRegisters(): Promise<Register[]> {
    try {
      // Asegúrate de que el Observable esté tipado correctamente
      const registersObservable = this.firestore.collection<Register>('registers').valueChanges();
      const registers = await firstValueFrom(registersObservable);

      // Utiliza el tipo correcto en las funciones filter y map
      const filteredRegisters = registers
        .filter((register: Register) => register.active)
        .map((register: Register) => {
          if (Array.isArray(register.images)) {
            register.images = register.images.filter((image: string) => image !== '');
          }
          return register;
        })
        .sort((a: Register, b: Register) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return filteredRegisters;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      throw error;
    }
  }



  async addRegister(register: Register): Promise<string> {
    try {
      const registerRef = await this.firestore.collection('registers').add(register);
      await registerRef.update({ id: registerRef.id })
      return registerRef.id;
    } catch (error) {
      console.error('Error al añadir el registro:', error);
      return 'error';
    }
  }

  async updateRegister(register: Register) {
    try {
      await this.firestore.collection('registers').doc(register.id).update(register);
      return true;
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      return error;
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

  async getRegisterById(registerId: string): Promise<Register> {
    try {
      const registerDoc = this.firestore.collection('registers').doc<Register>(registerId);
      const registerSnapshot = await firstValueFrom(registerDoc.get());
      if (registerSnapshot.exists) {
        const register = registerSnapshot.data() as Register;
        if (Array.isArray(register.images)) {
          register.images = register.images.filter((image: string) => image !== '');
        }
        return register;
      } else {
        console.error('Registro no encontrado');
        throw new Error('Registro no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el registro por ID:', error);
      throw error;
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Incident } from '../models/incident.interface';


@Injectable({
  providedIn: 'root'
})
export class BuldDataService {

  constructor(private firestore: AngularFirestore,
  ) { }

  async getBulkData(municipality: string): Promise<Observable<Incident[]>> {
    try {
      return this.firestore.collection<Incident>('incidents', ref => ref.where('municipality', '==', municipality)).valueChanges();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
}

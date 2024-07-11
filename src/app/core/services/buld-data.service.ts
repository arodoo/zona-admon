import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Incident } from '../models/incident.interface';

@Injectable({
  providedIn: 'root'
})
export class BuldDataService {

  constructor(private firestore: AngularFirestore) { }

  getBulkData1(municipality: string): Observable<Incident[]> {
    // Convertir el municipio a mayúsculas
    const upperCaseMunicipality = municipality.toUpperCase();
    return this.firestore.collection<Incident>('incidents_bulkData', ref => ref.
      where('municipality', '==', upperCaseMunicipality)).valueChanges();
  }

  getBulkData(municipality: string): Observable<Incident[]> {
    // Convertir el municipio a mayúsculas
    const upperCaseMunicipality = municipality.toUpperCase();
    // Calcular el final de la cadena para la búsqueda
    const endMunicipality = upperCaseMunicipality.slice(0, -1)
      + String.fromCharCode(upperCaseMunicipality.charCodeAt(upperCaseMunicipality.length - 1) + 1);
    return this.firestore.collection<Incident>('incidents_bulkData', ref => ref
      .where('municipality', '>=', upperCaseMunicipality)
      .where('municipality', '<', endMunicipality))
      .valueChanges();
  }

  getMunicipalityData(municipality: string): Observable<Incident[]> {
    // Convertir el municipio a mayúsculas
    const upperCaseMunicipality = municipality.toUpperCase();
    console.log('Municipio:', upperCaseMunicipality);
    
    return this.firestore.collection<Incident>('incidents_bulkData', ref => ref.
      where('municipality', '==', upperCaseMunicipality)).valueChanges();
  }
  
}

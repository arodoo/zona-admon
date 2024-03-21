import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private firestore: AngularFirestore,) { }


  //Metodo para llevar la bitácora de logins
  async logRegister(email: string, status: boolean) {
    if (status === true) {
      this.firestore.collection('logins').add({
        email: email,
        status: 'success',
        date: new Date()
      });
    } else if (status === false) {
      this.firestore.collection('logins').add({
        email: email,
        status: 'failed',
        date: new Date()
      });
    }
  }

  async logOutRegister(email: string) {
    this.firestore.collection('logins').add({
      email: email,
      status: 'logout',
      date: new Date()
    });
  }
}

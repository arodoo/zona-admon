import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.interface'; // Asegúrate de importar el modelo de chat
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { group } from 'console';
import { Observable } from 'rxjs'; // Importa Observable desde RxJS

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    // Resto de la lógica del servicio...
  }
  async getChats(): Promise<Chat[]> {
    try {
      const chatCollection = await this.firestore.collection<Chat>('groups').get().toPromise();
      return chatCollection!.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error al obtener los chats:', error);
      return [];
    }
  }

  async addChat(chat: Chat): Promise<string> {
    try {
      const chatRef = await this.firestore.collection('groups').add(chat);
      await chatRef.update({ id: chatRef.id });
      return chatRef.id;
    } catch (error) {
      console.error('Error al añadir el chat:', error);
      return 'error';
    }
  }


  }




import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewChatDialogComponent } from './new-chat-dialog/new-chat-dialog.component';


interface Message {
  text: string;
  sender: string; // 'user' o 'other'
  timestamp: Date;
}

interface Chat {
  name: string;
  imgUrl: string; // Agrega esta línea
  members: string;
  description: string;
}

@Component({
  selector: 'app-chat',
  standalone: true, // Indica que el componente es independiente
  imports: [FormsModule, CommonModule], // Importa los módulos necesarios aquí
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  newChatFormOpen = false;
  newChatName: string = '';
  newChatImgUrl: string = '';
  newChatMembers: string = '';
  newChatDescription: string = '';
  newMessage: string = '';
  messages: Message[] = [];
  chats: Observable<Chat[]> = of([]);
  groupInfo: any;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {
    this.initializeChats(); // Llamada al método para inicializar los chats
  }

  initializeChats(): void {
    this.chats = this.firestore.collection<Chat>('groups').valueChanges();
    // Ahora estamos obteniendo los chats desde Firestore
  }

  
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
      // Aquí podrías agregar la lógica para enviar el mensaje al servidor
    }
  }

  toggleNewChatForm(): void {
    this.newChatFormOpen = !this.newChatFormOpen;
  }

  createChat(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newChat: Chat = {
          name: result.name,
          imgUrl: result.imgUrl,
          members: result.members,
          description: this.newChatDescription,
    
        };

        this.firestore.collection<Chat>('groups').add(newChat);
        
        this.newChatFormOpen = false;
      }
    });
  }
}

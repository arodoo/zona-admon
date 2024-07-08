import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; 

export const CHAT_ROUTES: Routes = [
  {
    path: '', // Ruta raíz para el componente Chat
    component: ChatComponent,
  },
  // Otras rutas hijas del componente Chat aquí (si es necesario)
];

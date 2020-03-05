import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { firestore } from 'firebase/app';
import { Chat } from '../models/chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private db: AngularFirestore ) { }

  /*
  Metodo que trae todos los chat de la base de dato.
  */
  getChatRooms() {
    return this.db.collection('chatRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(room => {
        const data = room.payload.doc.data() as Chat;
        data.id = room.payload.doc.id;
        return data;
      });
    }));
  }

  /*
  Metodo que trae el chat que selecciones.
  */
  getChatRoom(chatID: string): Observable<any> {
    return this.db.collection('chatRooms').doc(chatID).valueChanges();
  }

  /*
  Metodo que envia el mensaje del usuario a la coleccion de chatRooms y lo une al array de mensajes.
  */
  sendMsgToFirebase(message: Message, chatID: string ) {
    this.db.collection('chatRooms').doc(chatID).update({
      messages: firestore.FieldValue.arrayUnion(message),
    });
  }
}

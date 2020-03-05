import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Message } from '../../models/message';
import { ChatService } from '../../servicios/chat.service';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  // Variable para recuperar la id del chat.
  public chat: any;
  // Variable para recuperar la sala del chat.
  public room: any;
  // Variable para enviar los mensajes.
  public msg: string;
  // Variable para guardar el nombre del usuario que escribe el mensage.
  public userName;

  constructor(private AFAuth: AngularFireAuth,
              private authSer: AuthService,
              private navParams: NavParams,
              private modal: ModalController,
              private chatSer: ChatService) { }

  ngOnInit() {
    this.chatSer.getChatRoom(this.chat.id).subscribe(rooms => this.room = rooms);
    this.chat = this.navParams.get('chat');
    this.getUserID();
  }

  // Metodo que cierra el chat.
  closeChat() {
    this.modal.dismiss();
  }

  /*
  Metodo que envia los mensages a la base de datos.
  */
  sendMenssage() {

    const mensaje: Message = {
      content: this.msg,
      type: 'text',
      date: new Date(),
      userName: this.userName
    };

    this.chatSer.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = '';
  }

  /*
  Metodo que obtenemos el nombre del usuario atraves del servicio.
  */
  getUserID() {
    const userID = this.AFAuth.auth.currentUser.uid;
    this.authSer.getUserName(userID).subscribe(doc => this.userName = doc.data().name);
  }
}

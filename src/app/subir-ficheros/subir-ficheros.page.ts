import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-ficheros',
  templateUrl: './subir-ficheros.page.html',
  styleUrls: ['./subir-ficheros.page.scss'],
})
export class SubirFicherosPage implements OnInit {
  progress = 0;

  constructor( private authSer: AuthService, private actionSheetController: ActionSheetController, private router: Router) {
    setInterval(() => {
      this.progress += .1;
    }, 1000);
  }

  /*
  Metodo que llama al servicio para desloguear al usuario.
  */
  onLogout() {
    this.authSer.logout();
  }

  volverHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

    // Se utiliza para el boton de los chat de la izquierda que nos permite desconectarnos de la app o ir a la pagina para subir fichero ha firebase.
    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        buttons: [{
          text: 'Desconectarse',
          role: 'destructive',
          icon: 'log-out',
          handler: () => {
            this.onLogout();
          }
        },
        {
          text: 'Volver al Home',
          icon: 'home',
          handler: () => {
            this.volverHome();
          }
        }]
      });
      await actionSheet.present();
    }
}

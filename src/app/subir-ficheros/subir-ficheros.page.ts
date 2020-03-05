import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-subir-ficheros',
  templateUrl: './subir-ficheros.page.html',
  styleUrls: ['./subir-ficheros.page.scss'],
})
export class SubirFicherosPage implements OnInit {
  progress = 0;

  constructor( private authSer: AuthService,
               private actionSheetController: ActionSheetController,
               private router: Router,
               private file: File,
               private filePath: FilePath,
               private fileChooser: FileChooser) {
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

  /*
  Metodo que nos redirrige a la pagina principal.
  */
  volverHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

  // Se utiliza para el boton de los chat de la izquierda que nos permite
  // desconectarnos de la app o ir a la pagina para subir fichero ha firebase.
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

  /*
  Metodo para obtener el fichero.
  */
  seleccionar() {
    this.fileChooser.open().then((uri) => {
      alert(uri);
      this.filePath.resolveNativePath(uri).then(filePath => {
        alert(filePath);
        let dirPathSegments = filePath.split('/'); // Cortar la cadena por /
        // Guardamos el nombre del fichero para obtener luego el tipo de archivo.
        let fileName = dirPathSegments[dirPathSegments.length - 1];
        dirPathSegments.pop(); // Elimina el ultimo elemento, el nombre del archivo.
        let dirPath = dirPathSegments.join('/'); // Unir por /
        let tipo = fileName.split('.'); // Cortar la cadena por .
        this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
          await this.subirArchivo(buffer, fileName, tipo);
        }).catch((err) => {
          alert(err.toString());
        });
      });
    });
  }

  /*
  Metodo para subir ficheros a firebase.
  */
  async subirArchivo(buffer, nombre, tipo) {
    let blob = new Blob([buffer], { type : tipo[1] });

    let storage = firebase.storage();
    storage.ref('chat/' + nombre).put(blob).then((d) => {
      alert('Correcto');
    }).catch((error => {
      alert(JSON.stringify(error));
    }));
  }

}

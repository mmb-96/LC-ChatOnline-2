import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // Variable para guardar el correo.
  public email: string;
  // Variable para guardar la contraseña.
  public password: string;
  // Variable para guardar el nombre del usuario.
  public name: string;
  // Variable que se utiliza en caso de error.
  private error = 'Correo electrónico registrado, contraseña no válida o falta rellenar algun campo.';

  constructor(private authSer: AuthService, private router: Router) { }

  ngOnInit() {
  }

  //Metodo que se utiliza para registrar el usuario en la base de datos, si funciona se envia a la pagina principal, en caso contrario se muestra un error.
  onSubmitRegister() {

    this.authSer.register(this.email, this.password, this.name).then(auth => this.router.navigate(['/home']))
    .catch(err => alert(this.error));
  }
}

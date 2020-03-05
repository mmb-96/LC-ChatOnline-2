import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variable para guardar el correo.
  public email: string;
  // Variable para guardar la contraseña.
  public password: string;
  // Variable que se utiliza en caso de error.
  private error = 'Los datos son incorrectos o no existe el usuario';

  constructor( private authSer: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  /*
  Metodo para logear el usuario, que lo devuelve a la pagina principal en caso de que el usuario exista, en caso contrario manda
  un mensaje de error.
  */
  public onSubmitLogin() {
    this.authSer.login( this.email, this.password ).then(res => this.router.navigate(['/home'])).catch(err => alert(this.error));
  }

}

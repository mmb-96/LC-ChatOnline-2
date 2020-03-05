import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoLoginGuard } from './guards/no-login.guard';

// Los canActivate es la llamada a los Guard para permitir el acceso de un sito a otro.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [ AuthGuard ]},
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule), canActivate: [ NoLoginGuard ]},
  { path: 'registro', loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule), canActivate: [ NoLoginGuard ]},
  { path: 'subir-ficheros',
    loadChildren: () => import('./subir-ficheros/subir-ficheros.module').then( m => m.SubirFicherosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirFicherosPage } from './subir-ficheros.page';

const routes: Routes = [
  {
    path: '',
    component: SubirFicherosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirFicherosPageRoutingModule {}

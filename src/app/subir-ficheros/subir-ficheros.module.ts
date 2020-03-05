import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirFicherosPageRoutingModule } from './subir-ficheros-routing.module';

import { SubirFicherosPage } from './subir-ficheros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirFicherosPageRoutingModule
  ],
  declarations: [SubirFicherosPage]
})
export class SubirFicherosPageModule {}

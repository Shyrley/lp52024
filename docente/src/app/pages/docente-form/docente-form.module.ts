import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteFormPageRoutingModule } from './docente-form-routing.module';

import { DocenteFormPage } from './docente-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteFormPageRoutingModule
  ],
  declarations: [DocenteFormPage]
})
export class DocenteFormPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputadoraFormPageRoutingModule } from './computadora-form-routing.module';

import { ComputadoraFormPage } from './computadora-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComputadoraFormPageRoutingModule
  ],
  declarations: [ComputadoraFormPage]
})
export class ComputadoraFormPageModule {}

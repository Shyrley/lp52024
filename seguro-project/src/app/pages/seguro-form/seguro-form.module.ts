import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguroFormPageRoutingModule } from './seguro-form-routing.module';

import { SeguroFormPage } from './seguro-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguroFormPageRoutingModule
  ],
  declarations: [SeguroFormPage]
})
export class SeguroFormPageModule {}

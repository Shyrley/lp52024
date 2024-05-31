import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputadoraListPageRoutingModule } from './computadora-list-routing.module';

import { ComputadoraListPage } from './computadora-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComputadoraListPageRoutingModule
  ],
  declarations: [ComputadoraListPage]
})
export class ComputadoraListPageModule {}

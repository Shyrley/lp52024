import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteListPageRoutingModule } from './docente-list-routing.module';

import { DocenteListPage } from './docente-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteListPageRoutingModule
  ],
  declarations: [DocenteListPage]
})
export class DocenteListPageModule {}

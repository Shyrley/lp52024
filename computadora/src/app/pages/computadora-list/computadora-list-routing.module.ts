import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComputadoraListPage } from './computadora-list.page';

const routes: Routes = [
  {
    path: '',
    component: ComputadoraListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputadoraListPageRoutingModule {}

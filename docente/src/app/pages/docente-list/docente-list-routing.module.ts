import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteListPage } from './docente-list.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteListPageRoutingModule {}

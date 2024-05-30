import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteFormPage } from './docente-form.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteFormPageRoutingModule {}

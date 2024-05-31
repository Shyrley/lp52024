import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComputadoraFormPage } from './computadora-form.page';

const routes: Routes = [
  {
    path: '',
    component: ComputadoraFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputadoraFormPageRoutingModule {}

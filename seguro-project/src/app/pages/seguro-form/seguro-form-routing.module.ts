import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguroFormPage } from './seguro-form.page';

const routes: Routes = [
  {
    path: '',
    component: SeguroFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguroFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'seguro-list',
    loadChildren: () => import('./pages/seguro-list/seguro-list.module').then( m => m.SeguroListPageModule)
  },
  {
    path: 'seguro-form',
    loadChildren: () => import('./pages/seguro-form/seguro-form.module').then( m => m.SeguroFormPageModule)
  },
  {
    path: 'seguro-form/:id',
    loadChildren: () => import('./pages/seguro-form/seguro-form.module').then( m => m.SeguroFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

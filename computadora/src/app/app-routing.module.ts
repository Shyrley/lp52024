import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'computadora-list',
    loadChildren: () => import('./pages/computadora-list/computadora-list.module').then( m => m.ComputadoraListPageModule)
  },
  {
    path: 'computadora-form',
    loadChildren: () => import('./pages/computadora-form/computadora-form.module').then( m => m.ComputadoraFormPageModule)
  },

  {
    path: 'computadora-form/:id',
    loadChildren: () => import('./pages/computadora-form/computadora-form.module').then( m => m.ComputadoraFormPageModule)
  },

  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'docente-list',
    loadChildren: () => import('./pages/docente-list/docente-list.module').then( m => m.DocenteListPageModule)
  },

  {
    path: 'docente-form/:id',
    loadChildren: () => import('./pages/docente-form/docente-form.module').then( m => m.DocenteFormPageModule)
  },

  {
    path: 'docente-form',
    loadChildren: () => import('./pages/docente-form/docente-form.module').then( m => m.DocenteFormPageModule)
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

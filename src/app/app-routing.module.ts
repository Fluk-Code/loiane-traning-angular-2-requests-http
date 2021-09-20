import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pesquisareativa'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module')
      .then(module => module.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module')
      .then(module => module.UploadFileModule)
  },
  {
    path: 'pesquisareativa',
    loadChildren: () => import('./reactive-search/reactive-search.module')
      .then(module => module.ReactiveSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

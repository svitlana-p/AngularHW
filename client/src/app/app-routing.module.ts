import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./layouts/auth-layout/auth-layout.module')
      .then(m => m.AuthLayoutModule)
  },
  {
    path: '', loadChildren: () => import('./layouts/site-layout/site-layout.module')
      .then(m => m.SiteLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

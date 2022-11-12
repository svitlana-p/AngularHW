import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./core/layouts/auth-layout/pages/auth-layout.module')
      .then(m => m.AuthLayoutModule)
  },
  {
    path: '', loadChildren: () => import('./core/layouts/site-layout/pages/site-layout.module')
      .then(m => m.SiteLayoutModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

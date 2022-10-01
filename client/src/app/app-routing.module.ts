import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './shared/classes/authguard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path:'', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path:'', component: SiteLayoutComponent,canActivate: [AuthGuard], children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'board', component: BoardPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

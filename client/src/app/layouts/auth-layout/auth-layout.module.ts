import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/layouts/auth-layout/pages/components/login/login.component';
import { CardComponent } from 'src/app/layouts/auth-layout/pages/components/card/card.component';
import { RegisterComponent } from 'src/app/layouts/auth-layout/pages/components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './pages/components/auth-layout-component/auth-layout.component';




@NgModule({
  declarations: [
    LoginComponent,
    CardComponent,
    RegisterComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
})
export class AuthLayoutModule { }

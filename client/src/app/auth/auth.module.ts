import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, RegisterComponent, CardComponent]
})
export class AuthModule { }

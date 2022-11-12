import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/core/layouts/auth-layout/pages/components/login-component/login.component';
import { RegisterComponent } from 'src/app/core/layouts/auth-layout/pages/components/register-component/register.component';
import { AuthLayoutComponent } from './components/auth-layout-component/auth-layout.component';



const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})



export class AuthRoutingModule { }


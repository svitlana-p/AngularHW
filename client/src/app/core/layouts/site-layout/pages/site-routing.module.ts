import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from 'src/app/core/layouts/site-layout/pages/components/board-page-component/board-page.component';
import { DashboardPageComponent } from 'src/app/core/layouts/site-layout/pages/components/dashboard-page-component/dashboard-page.component';
import { AuthGuard } from 'src/app/guards/authguard';
import { BoardResolver } from 'src/app/resolvers/board.resolver';
import { SiteLayoutComponent } from './components/site-layout-component/site-layout.component';



const routes: Routes = [
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'board/:id', component: BoardPageComponent, resolve: { data: BoardResolver } },
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

export class SiteRoutingModule { }

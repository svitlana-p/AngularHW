import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from 'src/app/layouts/site-layout/pages/components/board-page-component/board-page.component';
import { DashboardPageComponent } from 'src/app/layouts/site-layout/pages/components/dashboard-page-component/dashboard-page.component';
import { AuthGuard } from 'src/app/shared/classes/authguard';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { BoardResolver } from 'src/app/shared/services/board.resolver';
import { SiteLayoutComponent } from './pages/components/site-layout-component/site-layout.component';



const routes: Routes = [
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'board/:id', component: BoardPageComponent, resolve: { data: BoardResolver } },            
            { path: 'not-found', component: NotFoundComponent},
            { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
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


// export const SiteRoutes: Route[] = [
//     {
//         path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
//             { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//             { path: 'dashboard', component: DashboardPageComponent },
//             { path: 'board/:id', component: BoardPageComponent, resolve: { data: BoardResolver } },
//             { path: '**', redirectTo: '', component: AuthLayoutComponent, pathMatch: 'full' }
//           ]
//     }
// ]
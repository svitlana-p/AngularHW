import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from 'src/app/layouts/site-layout/pages/components/dashboard-page-component/dashboard-page.component';
import { BoardPageComponent } from 'src/app/layouts/site-layout/pages/components/board-page-component/board-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SiteRoutingModule } from './site-routing.module';
import { SiteLayoutComponent } from './pages/components/site-layout-component/site-layout.component';




@NgModule({
  declarations: [
    SiteLayoutComponent,
    DashboardPageComponent,
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    SiteRoutingModule
  ]
})
export class SiteLayoutModule { }

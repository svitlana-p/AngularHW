import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditBoardComponent } from './components/add-edit-board/add-edit-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddEditBoardComponent,
    DashboardItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }

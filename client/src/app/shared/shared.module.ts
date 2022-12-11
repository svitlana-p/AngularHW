import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBoardPipe } from './pipes/filter-board.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterTodoPipe } from './pipes/filter-todo.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const components = [
  FilterBoardPipe,
  SortPipe,
  PopupComponent,
  SpinnerComponent,
  FilterTodoPipe,
  FooterComponent,
  GlobalErrorComponent,
  NotFoundComponent,
  HeaderComponent,
  ToolbarComponent]

@NgModule({
  declarations: [...components ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [...components]
})
export class SharedModule { }

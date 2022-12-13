import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBoardPipe } from './pipes/filter-board.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterTodoPipe } from './pipes/filter-todo.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const components = [
  FilterBoardPipe,
  SortPipe,
  PopupComponent,
  SpinnerComponent,
  FilterTodoPipe,
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

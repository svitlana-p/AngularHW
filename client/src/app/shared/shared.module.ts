import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditBoardComponent } from './components/add-edit-board/add-edit-board.component';
import { AddEditTodoComponent } from './components/add-edit-todo/add-todo.component';
import { FocusDirective } from './directives/focus.directive';
import { FilterBoardPipe } from './pipes/filter-board.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ColorPikerComponent } from './components/color-piker/color-piker.component';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterTodoPipe } from './pipes/filter-todo.pipe';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AddEditBoardComponent,
    AddEditTodoComponent,
    FocusDirective,
    FilterBoardPipe,
    SortPipe,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent,
    SpinnerComponent,
    FilterTodoPipe,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    AddEditBoardComponent,
    AddEditTodoComponent,
    FocusDirective,
    FilterBoardPipe,
    FilterTodoPipe,
    SortPipe,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent, 
    BoardComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }

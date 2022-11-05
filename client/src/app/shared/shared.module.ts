import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';
import { AddEditTodoComponent } from './components/add-edit-todo/add-todo.component';
import { FocusDirective } from './directives/focus.directive';
import { FilterBoardPipe } from './pipes/filter-board.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HeaderComponent } from './components/header/header.component';
import { PopupComponent } from './components/popup/popup.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ColorPikerComponent } from './components/color-piker/color-piker.component';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AddBoardComponent,
    EditBoardComponent,
    AddEditTodoComponent,
    FocusDirective,
    FilterBoardPipe,
    SortPipe,
    HeaderComponent,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    AddBoardComponent,
    EditBoardComponent,
    AddEditTodoComponent,
    FocusDirective,
    FilterBoardPipe,
    SortPipe,
    HeaderComponent,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from './add-board/add-board.component';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { AddEditTodoComponent } from './add-edit-todo/add-todo.component';
import { HeaderComponent } from './header/header.component';
import { PopupComponent } from './popup/popup.component';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ColorPikerComponent } from './color-piker/color-piker.component';
import { TodosContainerComponent } from './todos-container/todos-container.component';

@NgModule({
  declarations: [
    AddBoardComponent,
    EditBoardComponent,
    GlobalErrorComponent,
    AddEditTodoComponent,
    HeaderComponent,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent
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
    GlobalErrorComponent,
    AddEditTodoComponent,
    HeaderComponent,
    PopupComponent,
    CommentModalComponent,
    ColorPikerComponent,
    TodosContainerComponent
  ]
})
export class ComponentsModule { }

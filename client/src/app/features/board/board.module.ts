import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddEditTodoComponent } from './components/add-edit-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPikerComponent } from './components/color-piker/color-piker.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { TodosContainerComponent } from './components/todos-container/todos-container.component';


@NgModule({
  declarations: [
    BoardComponent,
    AddEditTodoComponent,
    ColorPikerComponent,
    CommentModalComponent,
    TodosContainerComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,    
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BoardModule { }

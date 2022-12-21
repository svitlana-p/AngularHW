import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from 'src/app/core/services/popup.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { ITodo } from 'src/app/models/todo.interface';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent {
  @Input() todo!: ITodo;
  @Output() popupButtonSelected = new EventEmitter<{ popupButton: string, selectedTodo: ITodo }>()
  @Output() commentsSelected = new EventEmitter<{ popupButton: string, selectedTodo: ITodo }>()
  @Output() deleteTask = new EventEmitter<{todo: ITodo}>()
  @Output() archiveTask = new EventEmitter<{todo: ITodo}>()

  selectedTodo!: ITodo;
  popupButton!: string;

  boardId: string = this.route.snapshot.params.id;

  constructor(public todoService: TodoService,
    private route: ActivatedRoute,
    public popupService: PopupService
  ) { }

  choosePopupEdit(todo: ITodo): void {
    this.popupButton = 'edit';
    this.selectedTodo = todo;
    this.popupButtonSelected.emit({ popupButton: this.popupButton, selectedTodo: todo })
  }
  openComments(todo: ITodo) {
    this.popupButton = 'comment';
    this.selectedTodo = todo;
    this.commentsSelected.emit({ popupButton: this.popupButton, selectedTodo: todo })
  }

  delete(todo: ITodo) {
    this.deleteTask.emit({todo:todo})
  }

  archive(todo: ITodo) {
    this.archiveTask.emit({todo:todo})
  }
  
}

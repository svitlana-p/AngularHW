import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/core/services/popup.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { ITodo } from 'src/app/models/todo';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnDestroy {
  @Input() todo!: ITodo;
  @Output() popupButtonSelected = new EventEmitter<{ popupButton: string, selectedTodo: ITodo }>()
  @Output() commentsSelected = new EventEmitter<{ popupButton: string, selectedTodo: ITodo }>()

  selectedTodo!: ITodo;
  popupButton!: string;
  archiveSubscription!: Subscription;
  delListSubscription!: Subscription;

  boardId: string = this.route.snapshot.params.id;

  constructor(public todoService: TodoService,
    private route: ActivatedRoute,
    public popupService: PopupService
  ) { }
  ngOnDestroy(): void {
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();
  }

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
    this.delListSubscription = this.todoService.delete(this.boardId, todo).subscribe()
  }

  archive(todo: ITodo) {
    this.archiveSubscription = this.todoService.changeStatus(this.boardId, todo, 'archive').subscribe()
  }
  
}

import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from '../../../models/todo';
import { DashboardService } from '../../../services/dashboard.service';
import { PopupService } from '../../../services/popup.service';
import { TodoService } from '../../../services/todo.service';

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


  constructor(public todoService: TodoService,
    private route: ActivatedRoute,
    public dashboardService: DashboardService,
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
    const boardId: string = this.route.snapshot.params.id;
    this.delListSubscription = this.todoService.delete(boardId, todo).subscribe()
  }

  archive(todo: ITodo) {
    const boardId: string = this.route.snapshot.params.id;
    this.archiveSubscription = this.todoService.changeStatus(boardId, todo, 'archive').subscribe()
  }
  ngOnDestroy(): void {
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();

  }
}

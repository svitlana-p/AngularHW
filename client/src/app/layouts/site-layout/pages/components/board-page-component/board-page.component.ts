
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/shared/models/todo';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TodoService } from 'src/app/shared/services/todo.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css'],
})
export class BoardPageComponent implements OnInit, OnDestroy {

  boardSubscription!: Subscription;
  archiveSubscription!: Subscription;
  delListSubscription!: Subscription;
  editTodo!: ITodo;
  popupButton!: string;
  term = '';
  name!: string;
  sortValue = '';
  sortDesc = '';
  firstColor!: string;
  secondColor!: string;
  thirdColor!: string;
  todo!: ITodo;
  constructor(public todoService: TodoService,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public popupService: PopupService,) { }

  
  choosePopupAdd(): void {
    this.popupButton = 'add';
  }
  onFilter(eventData: { filterTerm: string }) {
    this.term = eventData.filterTerm
  }
  onSort(eventData: { sortValue: string, sortDirection: string }) {
    this.sortValue = eventData.sortValue
    this.sortDesc = eventData.sortDirection
  }
  onEdit(eventData: {popupButton:string, selectedTodo:ITodo}){
    this.popupButton = eventData.popupButton
    this.editTodo = eventData.selectedTodo
  }
  onComments(eventData: {popupButton:string, selectedTodo:ITodo}){
    this.popupButton = eventData.popupButton
    this.todo = eventData.selectedTodo
  }
  onColorSelect(eventData: { color: string, element: string }) {
    if (eventData.element === 'firstColor') this.firstColor = eventData.color;
    if (eventData.element === 'secondColor') this.secondColor = eventData.color;
    if (eventData.element === 'thirdColor') this.thirdColor = eventData.color;
  }
 
  drop(event: CdkDragDrop<ITodo[]>) {
    const todo: ITodo = event.previousContainer.data[event.previousIndex]
    const boardId: string = this.route.snapshot.params.id;
    this.todoService.drop(event, boardId, todo)
  }

 
  archive(todo: ITodo) {
    const boardId: string = this.route.snapshot.params.id;
    this.archiveSubscription = this.todoService.changeStatus(boardId, todo, 'archive').subscribe()
  }
 
  ngOnInit(): void {
    const boardId: string = this.route.snapshot.params.id;
    this.boardSubscription = this.dashboardService.getOne(boardId).subscribe((board) => {
      this.firstColor = board[0].firstColor,
      this.secondColor = board[0].secondColor,
      this.thirdColor = board[0].thirdColor
    });

  }

  ngOnDestroy(): void {
    this.dashboardService.bordName = '';
    this.todoService.todoList = [];
    this.todoService.inProgressList = [];
    this.todoService.doneList = [];
    if (this.boardSubscription) this.boardSubscription.unsubscribe();
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();
  }

}
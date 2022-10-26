
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/shared/models/todo';
import { IBoard } from 'src/app/shared/models/board';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TodoService } from 'src/app/shared/services/todo.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css'], 
})
export class BoardPageComponent implements OnInit {
  
  boardSubscription!: Subscription;
  listSubscription!: Subscription;
  editTodo!: ITodo;
  popupButton!: boolean;
  term = '';
  name!: string;
  sortValue = '';
  sortDesc = '';
  constructor(public todoService: TodoService,
              public dashboardService: DashboardService,
              private route: ActivatedRoute,
              public popupService: PopupService,) { }

  choosePopupEdit(todo: ITodo): void {
    this.popupButton = true;
    this.editTodo = todo;
  }
  choosePopupAdd(): void {
    this.popupButton = false;
  }
  onFilter(eventData: {filterTerm: string}){
    this.term = eventData.filterTerm
  }

  delete(todo:ITodo){
    const boardId:string = this.route.snapshot.params.id;
    this.todoService.delete(boardId, todo).subscribe()
  }

  onSort(eventData:{sortValue: string, sortDirection: string}){
    this.sortValue = eventData.sortValue
    this.sortDesc = eventData.sortDirection
  }
  
  drop(event: CdkDragDrop<ITodo[]>) {
    const todo = event.previousContainer.data[event.previousIndex]
    const boardId:string = this.route.snapshot.params.id;
    this.todoService.drop(event, boardId, todo)
  }
              
  ngOnInit(): void {
    const boardId:string = this.route.snapshot.params.id;
    this.boardSubscription = this.dashboardService.getOne(boardId).subscribe()
    //this.listSubscription = this.todoService.getAll(boardId).subscribe()
    
  }

  ngOnDestroy():void {
    this.dashboardService.bordName = '';
    this.todoService.todoList = [];
    this.todoService.inProgressList = [];
    this.todoService.doneList = [];
    if( this.boardSubscription) this.boardSubscription.unsubscribe();
    if( this.listSubscription) this.listSubscription.unsubscribe();
  }
  
}
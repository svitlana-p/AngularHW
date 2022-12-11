import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

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
    public popupService: PopupService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    const boardId: string = this.route.snapshot.params.id;
    this.spinnerService.open()
    this.boardSubscription = this.dashboardService.getOne(boardId).subscribe((board) => {
      this.firstColor = board[0].firstColor
      this.secondColor = board[0].secondColor
      this.thirdColor = board[0].thirdColor
      this.spinnerService.close()
    });

  }

  ngOnDestroy(): void {
    this.dashboardService.clear();
    this.todoService.clear();
    if (this.boardSubscription) this.boardSubscription.unsubscribe();
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();
  }

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
  onEdit(eventData: { popupButton: string, selectedTodo: ITodo }) {
    this.popupButton = eventData.popupButton
    this.editTodo = eventData.selectedTodo
  }
  onComments(eventData: { popupButton: string, selectedTodo: ITodo }) {
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

}

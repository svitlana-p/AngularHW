import { CdkDragDrop,  transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
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
  dashboardSubscrition!: Subscription;
  boardSubscription!: Subscription;
  archiveSubscription!: Subscription;
  delListSubscription!: Subscription;
  editTodo!: ITodo;
  popupButton!: string;
  name!: string;
  todo!: ITodo;
  colors: string[] = [];
  title!: string;

  constructor(public todoService: TodoService,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public popupService: PopupService,
    public spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const boardId: string = this.route.snapshot.params.id;
    this.spinnerService.open()
    this.boardSubscription = this.dashboardService.getOne(boardId).subscribe((board) => {
      this.colors = [...this.colors, board[0].firstColor, board[0].secondColor, board[0].thirdColor];
      this.title = board[0].name;
      this.spinnerService.close()
    });
  }

  ngOnDestroy(): void {
    this.todoService.clear();
    if (this.boardSubscription) this.boardSubscription.unsubscribe();
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();
    if (this.dashboardSubscrition) this.dashboardSubscrition.unsubscribe();
  }

  choosePopupAdd(): void {
    this.popupButton = 'add';
  }
  onFilter(eventData: { filterTerm: string }) {
    this.todoService.filter(eventData.filterTerm)
  }
  onSort(eventData: { sortValue: string, sortDirection: string }):void {
    this.todoService.sort(eventData.sortValue, eventData.sortDirection)
  }
  onEdit(eventData: { popupButton: string, selectedTodo: ITodo }):void {
    this.popupButton = eventData.popupButton
    this.editTodo = eventData.selectedTodo
  }
  onComments(eventData: { popupButton: string, selectedTodo: ITodo }):void {
    this.popupButton = eventData.popupButton
    this.todo = eventData.selectedTodo
  }
  onColorSelect(eventData: { color: string, element: string }):void {
    if (eventData.element === 'Todo') this.colors[0] = eventData.color;
    if (eventData.element === 'In Progress') this.colors[1] = eventData.color;
    if (eventData.element === 'Done') this.colors[2] = eventData.color;
  }
  onDelete(eventData: {}):void {
    const boardId: string = this.route.snapshot.params.id;
    if (confirm('Are you sure you want to delete the board?')) {
      this.dashboardSubscrition = this.dashboardService.delete(boardId).subscribe(() => {
        this.router.navigate(['dashboard']);
      })
    }
  }
  
  drop(event: CdkDragDrop<ITodo[]>):void {
    console.log(event.previousContainer, event.container)
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    } 
    // const todo: ITodo = event.previousContainer.data[event.previousIndex]
    // const boardId: string = this.route.snapshot.params.id;
    // this.todoService.drop(event, boardId, todo)
  }
  
  setColumns():string[] {
    return ['Todo', 'In Progress', 'Done']
  }


  getTodos(index: number, list: ITodo[]): ITodo[] {
    if (index === 0) return list.filter(el => el.created)
    if (index === 1) return list.filter(el => el.inProgress)
    if (index === 2) return list.filter(el => el.completed)
    return list;
  }
}

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  allBoardsSubscription!: Subscription;
  archiveSubscription!: Subscription;
  delListSubscription!: Subscription;
  dropSubscription!: Subscription;
  addTaskSubscription!: Subscription;
  editTaskSubscription!: Subscription;
  delTaskSubscription!: Subscription;
  archTaskSubscription!: Subscription;
  boardId!: string;
  editTodo!: ITodo;
  popupButton!: string;
  name!: string;
  todo!: ITodo;
  colors: string[] = [];
  title!: string;
  list: ITodo[] = [];
  listFiltered: ITodo[] = [];

  constructor(public todoService: TodoService,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public popupService: PopupService,
    public spinnerService: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.spinnerService.open();
    this.allBoardsSubscription = this.todoService.getAll(this.boardId).subscribe((todoList: ITodo[]) => {
      this.list = todoList;
      this.listFiltered = todoList;
    })
    this.boardSubscription = this.dashboardService.getOne(this.boardId).subscribe((board) => {
      this.colors = [...this.colors, board[0].firstColor, board[0].secondColor, board[0].thirdColor];
      this.title = board[0].name;
      this.spinnerService.close()
    });
  }

  ngOnDestroy(): void {
    if (this.boardSubscription) this.boardSubscription.unsubscribe();
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
    if (this.delListSubscription) this.delListSubscription.unsubscribe();
    if (this.dashboardSubscrition) this.dashboardSubscrition.unsubscribe();
    if (this.dropSubscription) this.dropSubscription.unsubscribe();
    if (this.allBoardsSubscription) this.allBoardsSubscription.unsubscribe();
    if (this.editTaskSubscription) this.editTaskSubscription.unsubscribe();
    if (this.addTaskSubscription) this.addTaskSubscription.unsubscribe();
    if (this.archTaskSubscription) this.archTaskSubscription.unsubscribe();
    if (this.delTaskSubscription) this.delTaskSubscription.unsubscribe();
  }
  onDeleteBoard(eventData: {}): void {
    const boardId: string = this.route.snapshot.params.id;
    if (confirm('Are you sure you want to delete the board?')) {
      this.dashboardSubscrition = this.dashboardService.delete(boardId).subscribe(() => {
        this.router.navigate(['dashboard']);
      })
    }
  }


  onFilter(eventData: { filterTerm: string }) {
    if (eventData.filterTerm.length === 0) this.listFiltered = this.list;
    this.listFiltered = this.list.filter(el => el.name.toLowerCase().includes(eventData.filterTerm.toLowerCase()));
  }

  onSort(eventData: { sortValue: string, sortDirection: string }): void {
    let sorted: ITodo[];
    let multiplier = 1;

    if (eventData.sortDirection === 'desc') {
      multiplier = -1;
    }

    sorted = this.listFiltered.sort((a: any, b: any) => {
      if (a[eventData.sortValue] < b[eventData.sortValue]) {
        return -1 * multiplier
      } else if (a[eventData.sortValue] > b[eventData.sortValue]) {
        return 1 * multiplier
      } else {
        return 0;
      }
    })

    this.listFiltered = sorted;
  }
  getColumns(): string[] {
    return ['Todo', 'In Progress', 'Done']
  }
  getTodos(index: number, list: ITodo[]): ITodo[] {
    if (index === 0) {
      return list.filter(el => el.created)
    }
    if (index === 1) {
      return list.filter(el => el.inProgress)
    }
    if (index === 2) {
      return list.filter(el => el.completed)
    }
    return list;
  }

  choosePopupAdd(): void {
    this.popupButton = 'add';
  }
  onEdit(eventData: { popupButton: string, selectedTodo: ITodo }): void {
    this.popupButton = eventData.popupButton
    this.editTodo = eventData.selectedTodo
  }
  onTaskAdd(eventData: { todo: ITodo }): void {
    this.addTaskSubscription = this.todoService.create(this.boardId, eventData.todo).subscribe(todo => {
      this.list = [...this.list, todo];
      this.listFiltered = [...this.listFiltered, todo];
    })
  }
  onTaskEdit(eventData: { todo: ITodo }): void {
    this.editTaskSubscription = this.todoService.edit(this.boardId, eventData.todo).subscribe(todo => {
      this.list = this.list.filter(el => el._id !== todo._id);
      this.list = [...this.list, todo];
      this.listFiltered = this.listFiltered.filter(el => el._id !== todo._id);
      this.listFiltered = [...this.listFiltered, todo]
    })
  }
  onTaskDelete(eventData: { todo: ITodo }): void {
    this.delTaskSubscription = this.todoService.delete(this.boardId, eventData.todo).subscribe((todo: ITodo) => {
      this.list = this.list.filter(el => el._id !== todo._id);
      this.listFiltered = this.listFiltered.filter(el => el._id !== todo._id);
    })
  }
  onTaskArchive(eventData: { todo: ITodo }): void {
    this.archTaskSubscription = this.todoService.changeStatus(this.boardId, eventData.todo, 'archive').subscribe((todo: ITodo) => {
      this.list = this.list.map(el => el._id !== todo._id ? el : todo);
      this.listFiltered = this.listFiltered.map(el => el._id !== todo._id ? el : todo);
    })
  }
  onComments(eventData: { popupButton: string, selectedTodo: ITodo }): void {
    this.popupButton = eventData.popupButton
    this.todo = eventData.selectedTodo
  }

  onColorSelect(eventData: { color: string, element: string }): void {
    if (eventData.element === 'Todo') this.colors[0] = eventData.color;
    if (eventData.element === 'In Progress') this.colors[1] = eventData.color;
    if (eventData.element === 'Done') this.colors[2] = eventData.color;
  }


  drop(event: CdkDragDrop<ITodo[]>, i: number): void {
    this.spinnerService.open()
    const id = event.container.element.nativeElement.id;
    const todo: ITodo = event.previousContainer.data[event.previousIndex];
    let action: string = '';
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if (id === '0') action = 'todo';
      if (id === '1') action = 'inProgress';
      if (id === '2') action = 'completed';
      this.dropSubscription = this.todoService.changeStatus(this.boardId, todo, action).subscribe((todo: ITodo) => {
        this.list = this.list.map(el => el._id !== todo._id ? el : todo);
        this.listFiltered = this.listFiltered.map(el => el._id !== todo._id ? el : todo);
        this.spinnerService.close()
      });
    } else {
      moveItemInArray(this.getTodos(i, this.listFiltered), event.previousIndex, event.currentIndex)
    }
  }


}

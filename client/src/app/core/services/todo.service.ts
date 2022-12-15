import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { IComment } from '../../models/comment.interface';
import { ITodo } from '../../models/todo.interface';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  list!: ITodo[];
  listFiltered!: ITodo[];
  commentList: IComment[] = [];

  url: string = 'https://dashboard-0y2w.onrender.com/api/board';

  getAll(boardId: string): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.url}/${boardId}`)
      .pipe(
        tap((todoList: ITodo[]) => {
          this.list = todoList;
          this.listFiltered = todoList;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  create(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.url}/${boardId}`, todo)
      .pipe(
        tap(todo => {
          this.list.push(todo);
          this.listFiltered.push(todo);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  edit(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, todo)
      .pipe(
        tap(todo => {
          this.list = this.list.filter(el => el._id !== todo._id);
          this.list = [...this.list, todo];
          this.listFiltered = this.listFiltered.filter(el => el._id !== todo._id);
          this.listFiltered = [...this.listFiltered, todo]
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  delete(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`)
      .pipe(
        tap((todo: ITodo) => {
          this.list = this.list.filter(el => el._id !== todo._id);
          this.listFiltered = this.listFiltered.filter(el => el._id !== todo._id);
        }),
        catchError(this.errorHandler.bind(this))
      )

  }
  changeStatus(boardId: string, todo: ITodo, action: string): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, { action })
      .pipe(
        tap((todo: ITodo) => {
          this.list = this.list.map(el => el._id !== todo._id ? el : todo);
          this.listFiltered = this.listFiltered.map(el => el._id !== todo._id ? el : todo);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  postComments(boardId: string, todoId: string, title: string): Observable<IComment> {
    if (!title) return EMPTY;
    return this.http.post<IComment>(`${this.url}/${boardId}/todo/${todoId}/comments`, { title, todoId })
      .pipe(
        tap((comment: IComment) => {
          this.commentList.push(comment)
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  getComments(boardId: string, todoId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.url}/${boardId}/todo/${todoId}/comments`)
      .pipe(
        tap((comments: IComment[]) => {
          this.commentList = comments;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  deleteComments(boardId: string, todoId: string, comment: IComment): Observable<IComment> {
    return this.http.delete<IComment>(`${this.url}/${boardId}/todo/${todoId}/comments/${comment._id}`)
      .pipe(
        tap((comment: IComment) => {
          this.commentList = this.commentList.filter(el => el._id !== comment._id)
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  drop(event: CdkDragDrop<ITodo[]>, boardId: string, todo: ITodo): void {
    const id = event.container.element.nativeElement.id;
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      if (id === '0') {
        this.changeStatus(boardId, todo, 'todo').subscribe()
      } else if (id === '1') {
        this.changeStatus(boardId, todo, 'inProgress').subscribe()
      } else if (id === '2') {
        this.changeStatus(boardId, todo, 'completed').subscribe()
      }
    } else {
      moveItemInArray(this.listFiltered, event.previousIndex, event.currentIndex)
    }

  }
  clear(): void {
    this.list = [];
  }

  filter(search: string): void {
    if (search.length === 0) this.listFiltered = this.list;
    this.listFiltered = this.list.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
  }

  sort(sortField: string, sordDirection: string): void {
    let sorted: ITodo[];
    let multiplier = 1;

    if (sordDirection === 'desc') {
      multiplier = -1;
    }

    sorted = this.listFiltered.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier
      } else {
        return 0;
      }
    })

    this.listFiltered = sorted;
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

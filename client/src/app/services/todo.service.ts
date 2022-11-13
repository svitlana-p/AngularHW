import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { IComment } from '../models/comment';
import { ITodo } from '../models/todo';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  todoList: ITodo[] = [];
  inProgressList: ITodo[] = [];
  doneList: ITodo[] = [];
  commentList: IComment[] = [];

  url: string = 'https://polar-thicket-64635.herokuapp.com/api/board';

  getAll(boardId: string): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.url}/${boardId}`)
      .pipe(
        tap((todoList: ITodo[]) => {
          todoList.forEach((item) => {
            if (item.created === true) {
              this.todoList.push(item)
            } else if (item.inProgress === true) {
              this.inProgressList.push(item)
            } else if (item.completed === true) {
              this.doneList.push(item)
            }
          })
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  create(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.url}/${boardId}`, todo)
      .pipe(
        tap(todo => {
          this.todoList.push(todo)
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  edit(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, todo)
      .pipe(
        tap(todo => {
          if (todo.created) {
            this.todoList = this.todoList.filter(el => el._id !== todo._id);
            this.todoList.push(todo)
          } else if (todo.inProgress) {
            this.inProgressList = this.inProgressList.filter(el => el._id !== todo._id);
            this.inProgressList.push(todo)
          } else if (todo.completed) {
            this.doneList = this.doneList.filter(el => el._id !== todo._id);
            this.doneList.push(todo)
          }
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  delete(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`)
      .pipe(
        tap((todo: ITodo) => {
          if (todo.created) {
            this.todoList = this.todoList.filter(el => el._id !== todo._id);            
          } else if (todo.inProgress) {
            this.inProgressList = this.inProgressList.filter(el => el._id !== todo._id);          
          } else if (todo.completed) {
            this.doneList = this.doneList.filter(el => el._id !== todo._id);        
          }
        }),
        catchError(this.errorHandler.bind(this))
      )

  }
  changeStatus(boardId: string, todo: ITodo, action: string): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, { action })
      .pipe(
        tap((todo: ITodo) => {
          if (todo.created) {
            this.todoList = this.todoList.map(el => el._id !== todo._id ? el : todo);
          } else if (todo.inProgress) {
            this.inProgressList = this.inProgressList.map(el => el._id !== todo._id ? el : todo);
          } else if (todo.completed) {
            this.doneList = this.doneList.map(el => el._id !== todo._id ? el : todo);
          }
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

  drop(event: CdkDragDrop<ITodo[]>, boardId: string, todo: ITodo) {
    const className = event.container.element.nativeElement.className;
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      if (className.includes('firstList')) {
        this.changeStatus(boardId, todo, 'todo').subscribe()
      } else if (className.includes('secondList')) {
        this.changeStatus(boardId, todo, 'inProgress').subscribe()
      } else if (className.includes('thirdList')) {
        this.changeStatus(boardId, todo, 'completed').subscribe()
      }
    } else {
      moveItemInArray(this.todoList, event.previousIndex, event.currentIndex)
    }

  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

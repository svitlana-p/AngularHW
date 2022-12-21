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

  url: string = 'https://dashboard-0y2w.onrender.com/api/board';

  getAll(boardId: string): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.url}/${boardId}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  create(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.url}/${boardId}`, todo)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  edit(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, todo)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  delete(boardId: string, todo: ITodo): Observable<ITodo> {
    return this.http.delete<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )

  }
  changeStatus(boardId: string, todo: ITodo, action: string): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, { action })
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  postComments(boardId: string, todoId: string, title: string): Observable<IComment> {
    if (!title) return EMPTY;
    return this.http.post<IComment>(`${this.url}/${boardId}/todo/${todoId}/comments`, { title, todoId })
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  getComments(boardId: string, todoId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.url}/${boardId}/todo/${todoId}/comments`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  deleteComments(boardId: string, todoId: string, comment: IComment): Observable<IComment> {
    return this.http.delete<IComment>(`${this.url}/${boardId}/todo/${todoId}/comments/${comment._id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

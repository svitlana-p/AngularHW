import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITodo } from '../models/todo';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  constructor(private http: HttpClient,
              private errorService: ErrorService) { }

  todoList!: ITodo[]
  
  url:string = 'http://localhost:8080/api/board';

  getAll(boardId:string):Observable<ITodo[]>{      
    return this.http.get<ITodo[]>(`${this.url}/${boardId}`)
    .pipe(
      tap((todoList: ITodo[]) => this.todoList = todoList),
      catchError(this.errorHandler.bind(this))
    )
  }
  
  create(boardId:string, todo:ITodo) :Observable<ITodo>{
    return this.http.post<ITodo>(`${this.url}/${boardId}`, todo)
    .pipe(        
      tap(todo => {
        this.todoList.push(todo)         
      }),
      catchError(this.errorHandler.bind(this))
    )
  }
  edit(boardId:string, todo:ITodo) :Observable<ITodo>{
    return this.http.patch<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, todo)
    .pipe(        
      tap(todo => {         
        this.todoList = this.todoList.filter(el=>el._id !== todo._id);
        this.todoList.push(todo)      
      }),
      catchError(this.errorHandler.bind(this))
    )
  }
  delete(boardId:string, todo:ITodo) :Observable<ITodo>{
    return this.http.delete<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`)  
  .pipe(
    tap((todo:ITodo) => {
      this.todoList = this.todoList.filter(el =>el._id !== todo._id)
    }),
    catchError(this.errorHandler.bind(this))
    )
    
}

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)  
  }
}

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  todoList: ITodo[] = [];
  inProgressList: ITodo[] =[];
  doneList: ITodo[] = [];
  
  url:string = 'http://localhost:8080/api/board';

  getAll(boardId:string):Observable<ITodo[]>{      
    return this.http.get<ITodo[]>(`${this.url}/${boardId}`)
    .pipe(
      tap((todoList: ITodo[]) => {
        todoList.forEach((item)=> {
          if (item.created === true) {
            this.todoList.push(item)
          } else if (item.inProgress === true) {
            this.inProgressList.push(item)
          } else if (item.completed === true) {
            this.doneList.push(item)
          }
        })
        //this.todoList = todoList
      }),
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
        if (todo.created) {
          this.todoList = this.todoList.filter(el=>el._id !== todo._id);
          this.todoList.push(todo) 
        } else if(todo.inProgress) {
          this.inProgressList = this.inProgressList.filter(el=>el._id !== todo._id);
          this.inProgressList.push(todo) 
        } else if (todo.completed) {
          this.doneList = this.doneList.filter(el=>el._id !== todo._id);
          this.doneList.push(todo) 
        }
             
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
changeStatus(boardId:string, todo:ITodo, action: string) :Observable<ITodo>{
  return this.http.put<ITodo>(`${this.url}/${boardId}/todo/${todo._id}`, {action})
  .pipe(
    tap((todo:ITodo) => {
      if (todo.created) {
        this.todoList = this.todoList.filter(el=>el._id !== todo._id);
        this.todoList.push(todo) 
      } else if(todo.inProgress) {
        this.inProgressList = this.inProgressList.filter(el=>el._id !== todo._id);
        this.inProgressList.push(todo) 
      } else if (todo.completed) {
        this.doneList = this.doneList.filter(el=>el._id !== todo._id);
        this.doneList.push(todo) 
      }
    })
  )
}


drop(event: CdkDragDrop<ITodo[]>, boardId:string, todo:ITodo) {
  if(event.previousContainer !== event.container) {
    //console.log(event.container.data)
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    
    if (event.container.id === 'cdk-drop-list-0') {
      this.changeStatus(boardId, todo, 'todo').subscribe()
    } else if (event.container.id === 'cdk-drop-list-1') {
      this.changeStatus(boardId, todo, 'inProgress').subscribe()
    } else if (event.container.id === 'cdk-drop-list-2') {
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

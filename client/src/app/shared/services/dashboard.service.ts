import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Board } from 'src/app/shared/models/board';
import { ErrorService } from './error.service';
import {  catchError, Observable, throwError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

    boardList!: Board[]
    

    getAll():Observable<Board[]>{      
      return this.http.get<Board[]>('http://localhost:8080/api/dashboard')
      .pipe(
        tap((boardList: Board[]) => this.boardList = boardList),
        catchError(this.errorHandler.bind(this))
      )
    }
    
    create(board:Board) :Observable<Board>{
      return this.http.post<Board>('http://localhost:8080/api/dashboard', board)
      .pipe(        
        tap(board => {
          this.boardList.push(board)
        }),
        
      )
    }

    edit(board:Board): Observable<Board>{
      return this.http.patch<Board>(`http://localhost:8080/api/dashboard/${board._id}`, board)
      .pipe(
        tap(board => {
          const newList = this.boardList.filter(el=>el._id !== board._id);
          this.boardList = newList;
          this.boardList.push(board);
        })
      )      
    }

    delete(board:Board) :Observable<Board[]>{
        return this.http.delete<Board[]>(`http://localhost:8080/api/dashboard/${board._id}`, {
        params : new HttpParams({
          fromString: 'userId = board.userId'
        })
      })
      .pipe(
        tap((boards:Board[]) => this.boardList = boards))
    }

    

    private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message)
      return throwError(() => error.message)  
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IBoard } from 'src/app/shared/models/board';
import { ErrorService } from './error.service';
import { catchError, Observable, throwError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  boardList!: IBoard[];
  bordName!: string;
  url: string = 'http://localhost:8080/api/dashboard';

  getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.url)
      .pipe(
        tap((boardList: IBoard[]) => this.boardList = boardList),
        catchError(this.errorHandler.bind(this))
      )
  }
  getOne(boardId:string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/${boardId}`)
      .pipe(
        tap(board => {
          this.bordName = board[0].name;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  update(boardId:string, color:string, colorValue:string):Observable<IBoard> {
    return this.http.put<IBoard>(`${this.url}/${boardId}`, {
      color,
      colorValue
    }).pipe(
      // tap(board => {
      //   console.log(board)
      //  this.boardList.map(el => el._id !== board._id ? el : board);
      // }),
      catchError(this.errorHandler.bind(this))
    )
  }
  create(board: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(this.url, board)
      .pipe(
        tap(board => {
          this.boardList.push(board)
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  edit(board: IBoard): Observable<IBoard> {
    return this.http.patch<IBoard>(`${this.url}/${board._id}`, board)
      .pipe(
        tap(board => {
          this.boardList = this.boardList.filter(el => el._id !== board._id);
          this.boardList.push(board);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  delete(board: IBoard): Observable<IBoard[]> {
    return this.http.delete<IBoard[]>(`${this.url}/${board._id}`, {
      params: new HttpParams({
        fromString: 'userId = board.userId'
      })
    })
      .pipe(
        tap((boards: IBoard[]) => this.boardList = boards),
        catchError(this.errorHandler.bind(this))
      )

  }



  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

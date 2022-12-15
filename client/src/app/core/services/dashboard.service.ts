import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IBoard } from 'src/app/models/board.interface';
import { ErrorService } from './error.service';
import { catchError, Observable, throwError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  boardList: IBoard[] = [];
  boardListFiltered: IBoard[] = [];
  bordName!: string;
  url: string = 'https://dashboard-0y2w.onrender.com/api/dashboard';

  getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.url)
      .pipe(
        tap((boardList: IBoard[]) => {
          this.boardList = boardList;
          this.boardListFiltered = boardList;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  getOne(boardId: string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/${boardId}`)
      .pipe(
        tap(board => {
          this.bordName = board[0].name;
        }),
        catchError(this.errorHandler.bind(this))
      )
  }
  update(boardId: string, color: string, colorValue: string): Observable<IBoard> {
    console.log(color)
    return this.http.put<IBoard>(`${this.url}/${boardId}`, {
      color,
      colorValue
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }
  create(board: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(this.url, board)
      .pipe(
        tap(board => {
          this.boardList = [...this.boardList, board];
          this.boardListFiltered = [...this.boardListFiltered, board];
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  edit(board: IBoard): Observable<IBoard> {
    return this.http.patch<IBoard>(`${this.url}/${board._id}`, board)
      .pipe(
        tap(board => {
          this.boardList = this.boardList.filter(el => el._id !== board._id);
          this.boardList = [...this.boardList, board];
          this.boardListFiltered = this.boardListFiltered.filter(el => el._id !== board._id);
          this.boardListFiltered = [...this.boardListFiltered, board];
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  delete(boardId: string): Observable<IBoard[]> {
    return this.http.delete<IBoard[]>(`${this.url}/${boardId}`, {
      params: new HttpParams({
        fromString: 'userId = board.userId'
      })
    })
      .pipe(
        tap((boards: IBoard[]) => this.boardList = boards),
        catchError(this.errorHandler.bind(this))
      )

  }
  clear() {
    this.bordName = ''
  }

  filter(search: string) {
    if(search === '') this.boardListFiltered = this.boardList;
    this.boardListFiltered = this.boardList.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
  }
  sort(sortField:string, sordDirection:string): void {
    let sorted: IBoard[];
    let multiplier = 1;

    if (sordDirection === 'desc') {
      multiplier = -1;
    }

    sorted = this.boardListFiltered.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier
      } else {
        return 0;
      }
    })

    this.boardListFiltered = sorted;
}

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

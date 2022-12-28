import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IBoard } from 'src/app/models/board.interface';
import { ErrorService } from './error.service';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  url: string = 'https://dashboard-0y2w.onrender.com/api/dashboard';

  getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.url)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  getOne(boardId: string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/${boardId}`)
      .pipe(
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
        catchError(this.errorHandler.bind(this))
      )
  }

  edit(board: IBoard): Observable<IBoard> {
    return this.http.patch<IBoard>(`${this.url}/${board._id}`, board)
      .pipe(
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
        catchError(this.errorHandler.bind(this))
      )

  }
  filter(filterTerm:string, list:IBoard[]):IBoard[]{
    if (filterTerm.length === 0)return list;
    return list.filter(el => el.name.toLowerCase().includes(filterTerm.toLowerCase()));
  }
  sort(sortValue: string, sortDirection: string, list:IBoard[]):IBoard[]{
    let sorted: IBoard[];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    sorted = list.sort((a: any, b: any) => {
      if (a[sortValue] < b[sortValue]) {
        return -1 * multiplier
      } else if (a[sortValue] > b[sortValue]) {
        return 1 * multiplier
      } else {
        return 0;
      }
    })

    return sorted;
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

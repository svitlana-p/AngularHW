import { Injectable } from "@angular/core";
import { boardMock } from "../mocks/board-mock";
import { IBoard } from "../models/board";
import { Observable, of } from 'rxjs';

@Injectable()
export class DashboardServiceMock {

  getAll(): Observable<IBoard[]> {
    return of(boardMock)
  }

  getOne(boardId: string): Observable<IBoard> {
    return of(boardMock[0])
  }

  update(boardId: string, color: string, colorValue: string): Observable<IBoard> {
    return of(boardMock[0])
  }

  create(board: IBoard): Observable<IBoard> {
    return of(boardMock[1])
  }

  edit(board: IBoard): Observable<IBoard> {
    return of(boardMock[2])
  }

  delete(boardId: string): Observable<IBoard[]> {
    return of(boardMock)
  }
}

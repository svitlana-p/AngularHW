import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError, catchError } from 'rxjs';
import { IAnswer } from '../../models/answer.interface';
import { IUser } from '../../models/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  url: string = 'https://dashboard-0y2w.onrender.com/api/auth';
  
  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/register`, user)
      .pipe(catchError(this.errorHandler.bind(this)))

  }

  login(user: IUser): Observable<IAnswer> {
    return this.http.post<IAnswer>(`${this.url}/login`, user)
      .pipe(
        tap(
          (info: IAnswer) => {
            localStorage.setItem('auth-token', info.token)
            this.setToken(info.token)
            localStorage.setItem('username', info.username)
          }
        ),
        catchError(this.errorHandler.bind(this)),
      )
  }

  setToken(token: string): void {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
  logout() {
    this.setToken('')
    localStorage.clear()
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}

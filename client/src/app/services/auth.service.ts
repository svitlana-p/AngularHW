import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError, catchError } from 'rxjs';
import { User } from '../models/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('https://polar-thicket-64635.herokuapp.com/api/auth/register', user)
      .pipe(catchError(this.errorHandler.bind(this)))

  }

  login(user: User): Observable<any> {
    return this.http.post('https://polar-thicket-64635.herokuapp.com/api/auth/login', user)
      .pipe(        
        tap(         
          (info: any) => {           
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

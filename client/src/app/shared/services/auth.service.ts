import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError, catchError } from 'rxjs';
import { User } from '../models/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!:string;

  constructor(private http: HttpClient,
    private errorService: ErrorService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/auth/register', user)
    .pipe(catchError(this.errorHandler.bind(this)))
    
  }
  
  login(user: User): Observable<{token:string}> {
    return this.http.post('http://localhost:8080/api/auth/login', user)
    .pipe(      
      // @ts-ignore
      tap(
        // @ts-ignore
        ({token}) => {
          localStorage.setItem('auth-token',token)
          this.setToken(token)
        }
      ),
      catchError(this.errorHandler.bind(this)),
    )
  }

  setToken(token:string) {
    this.token = token
  }

  getToken():string {
    return this.token
  }

  isAuthenticated():boolean {
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

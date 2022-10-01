import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!:string;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/auth/register', user)
    
  }
  
  login(user: User): Observable<{token:string}> {
    return this.http.post('http://localhost:8080/api/auth/login', user)
    .pipe(
      // @ts-ignore
      tap(
        ({token}) => {
          //console.log(token)
           localStorage.setItem('auth-token',token)
          this.setToken(token)
        }
      )
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
}

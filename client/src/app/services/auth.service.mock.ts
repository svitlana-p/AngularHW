import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserMock } from '../mocks/user-mock';
import { User } from '../models/user';


@Injectable()
export class AuthServiceMock {

  register(user: User): Observable<User> {
    return of(UserMock)
  }
  login(user: User): Observable<any> {
    return of({ token: 'dfghjklsdfghjkjsdfghgxcvg', username: 'user' })
  }
  getToken(): string {
    return 'dfghjklsdfghjkjsdfghgxcvg'
  }

  isAuthenticated(): boolean {
    return true
  }

  logout() {
    return true
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserMock } from '../../testing/mocks/user-mock';
import { IUser } from '../../models/user';


@Injectable()
export class AuthServiceMock {

  register(user: IUser): Observable<IUser> {
    return of(UserMock)
  }
  login(user: IUser): Observable<any> {
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
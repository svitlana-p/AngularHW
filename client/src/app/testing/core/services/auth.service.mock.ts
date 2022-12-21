import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';
import { UserMock } from '../../mocks/user-mock';


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
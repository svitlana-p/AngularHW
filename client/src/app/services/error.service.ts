import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new BehaviorSubject<string>('');

  handle(message: string) {
    this.error$.next(message)
  }
  clear() {
    this.error$.next('')
  }

}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ITodo } from '../models/todo';
import { TodoService } from '../core/todo.service';

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<ITodo[]> {
  constructor(private todoService: TodoService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITodo[]> {
    return this.todoService.getAll(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['dashboard']);
        return EMPTY;
      })
    )
  }

}

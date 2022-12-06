import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from '../core/todo.service';
import { TodoserviceMock } from '../core/todo.service.mock';

import { BoardResolver } from './board.resolver';

describe('BoardResolver', () => {
  let resolver: BoardResolver;
  let todoService: TodoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: TodoService, useClass: TodoserviceMock
        }
      ]
    });
    resolver = TestBed.inject(BoardResolver);
    todoService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { TodoService } from './todo.service';
import { ErrorService } from './error.service';
import { todoMock } from '../mocks/todo-mock';
import { boardMock } from '../mocks/board-mock';
import { CommentMock } from '../mocks/comment-mock';
import { ITodo } from '../models/todo';



describe('TodoService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let service: TodoService;
    let errorService: ErrorService;
    const boardId = boardMock[0]._id;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new TodoService(httpClientSpy, errorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all todos', (done: DoneFn) => {

        httpClientSpy.get.and.returnValue(of(todoMock));

        service.getAll(boardId).subscribe({
            next: data => {
                expect(data).toEqual(todoMock);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should sort todos into three arrays depend on its properties', (done: DoneFn) => {
        let todoList: ITodo[] = [];
        let inProgressList: ITodo[] = [];
        let doneList: ITodo[] = [];
        httpClientSpy.get.and.returnValue(of(todoMock));

        service.getAll(boardId)
            .pipe(tap((data: ITodo[]) => {
                data.forEach(item => {
                    if (item.created === true) {
                        todoList.push(item)
                    } else if (item.inProgress === true) {
                        inProgressList.push(item)
                    } else if (item.completed === true) {
                        doneList.push(item)
                    }
                })
            }))
            .subscribe({
                next: () => {
                    expect(todoList).toEqual([todoMock[0]]);
                    expect(inProgressList).toEqual([todoMock[1]]);
                    expect(doneList).toEqual([todoMock[2]]);
                    done();
                },
                error: done.fail
            });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should be OK returning no todos', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of([]));

        service.getAll(boardId).subscribe({
            next: data => {
                expect(data.length).toBe(0);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    })

    it('should create a todo', (done: DoneFn) => {
        const todo = todoMock[0]
        httpClientSpy.post.and.returnValue(of(todoMock[0]));

        service.create(boardId, todo).subscribe({
            next: data => {
                expect(data).toEqual(todoMock[0]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.post.calls.count()).toBe(1);
    });

    it('should edit a todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[1]
        httpClientSpy.patch.and.returnValue(of(todoMock[1]));

        service.edit(boardId, todo).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                expect(data).toEqual(todoMock[1]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });
    it('should push todo to inProgress array', (done: DoneFn) => {
        let todo = todoMock[1]
        let todoList: ITodo[] = [todoMock[0]];
        let inProgressList: ITodo[] = [todoMock[1]];
        let doneList: ITodo[] = [todoMock[2]];
        httpClientSpy.patch.and.returnValue(of(todoMock[1]));

        service.edit(boardId, todo)
            .pipe(tap((todo: ITodo) => {
                if (todo.created) {
                    todoList = todoList.filter(el => el._id !== todo._id);
                    todoList.push(todo)
                } else if (todo.inProgress) {
                    inProgressList = inProgressList.filter(el => el._id !== todo._id);
                    inProgressList.push(todo)
                } else if (todo.completed) {
                    doneList = doneList.filter(el => el._id !== todo._id);
                    doneList.push(todo)
                }
            }))
            .subscribe({
                next: () => {
                    expect(inProgressList).toEqual([todoMock[1]]);
                    done();
                },
                error: done.fail
            });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });
    it('should edit a todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[1]
        httpClientSpy.patch.and.returnValue(of(todoMock[1]));

        service.edit(boardId, todo).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                expect(data).toEqual(todoMock[1]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });
    it('should push todo to todoList array', (done: DoneFn) => {
        let todo = todoMock[0]
        let todoList: ITodo[] = [todoMock[0]];
        let inProgressList: ITodo[] = [todoMock[1]];
        let doneList: ITodo[] = [todoMock[2]];
        httpClientSpy.patch.and.returnValue(of(todoMock[0]));

        service.edit(boardId, todo)
            .pipe(tap((todo: ITodo) => {
                if (todo.created) {
                    todoList = todoList.filter(el => el._id !== todo._id);
                    todoList.push(todo)
                } else if (todo.inProgress) {
                    inProgressList = inProgressList.filter(el => el._id !== todo._id);
                    inProgressList.push(todo)
                } else if (todo.completed) {
                    doneList = doneList.filter(el => el._id !== todo._id);
                    doneList.push(todo)
                }
            }))
            .subscribe({
                next: () => {
                    expect(todoList).toEqual([todoMock[0]]);
                    done();
                },
                error: done.fail
            });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });

    it('should edit a todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[1]
        httpClientSpy.patch.and.returnValue(of(todoMock[1]));

        service.edit(boardId, todo).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                expect(data).toEqual(todoMock[1]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });

    it('should push todo to doneList array', (done: DoneFn) => {
        let todo = todoMock[2]
        let todoList: ITodo[] = [todoMock[0]];
        let inProgressList: ITodo[] = [todoMock[1]];
        let doneList: ITodo[] = [todoMock[2]];
        httpClientSpy.patch.and.returnValue(of(todoMock[2]));

        service.edit(boardId, todo)
            .pipe(tap((todo: ITodo) => {
                if (todo.created) {
                    todoList = todoList.filter(el => el._id !== todo._id);
                    todoList.push(todo)
                } else if (todo.inProgress) {
                    inProgressList = inProgressList.filter(el => el._id !== todo._id);
                    inProgressList.push(todo)
                } else if (todo.completed) {
                    doneList = doneList.filter(el => el._id !== todo._id);
                    doneList.push(todo)
                }
            }))
            .subscribe({
                next: () => {
                    expect(doneList).toEqual([todoMock[2]]);
                    done();
                },
                error: done.fail
            });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });


    it('should change status of todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[1];
        const action = 'inProgress';
        let todoList: ITodo[] = [];
        let inProgressList: ITodo[] = [];
        let doneList: ITodo[] = [];
        httpClientSpy.put.and.returnValue(of(todoMock[1]));

        service.changeStatus(boardId, todo, action).pipe(tap((todo: ITodo) => {
            if (todo.created) {
                todoList.push(todo)
            } else if (todo.inProgress) {
                inProgressList.push(todo)
            } else if (todo.completed) {
                doneList.push(todo)
            }
        })).subscribe({
            next: () => {
                expect(inProgressList).toEqual([todoMock[1]]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });
    it('should change status of todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[0];
        const action = 'inProgress';
        let todoList: ITodo[] = [];
        let inProgressList: ITodo[] = [];
        let doneList: ITodo[] = [];
        httpClientSpy.put.and.returnValue(of(todoMock[0]));

        service.changeStatus(boardId, todo, action).pipe(tap((todo: ITodo) => {
            if (todo.created) {
                todoList.push(todo)
            } else if (todo.inProgress) {
                inProgressList.push(todo)
            } else if (todo.completed) {
                doneList.push(todo)
            }
        })).subscribe({
            next: () => {
                expect(todoList).toEqual([todoMock[0]]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });
    it('should change status of todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[2];
        const action = 'inProgress';
        let todoList: ITodo[] = [];
        let inProgressList: ITodo[] = [];
        let doneList: ITodo[] = [];
        httpClientSpy.put.and.returnValue(of(todoMock[2]));

        service.changeStatus(boardId, todo, action).pipe(tap((todo: ITodo) => {
            if (todo.created) {
                todoList.push(todo)
            } else if (todo.inProgress) {
                inProgressList.push(todo)
            } else if (todo.completed) {
                doneList.push(todo)
            }
        })).subscribe({
            next: () => {
                expect(doneList).toEqual([todoMock[2]]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });



    it('should push todo in correct array', (done: DoneFn) => {
        const todo = todoMock[1];
        const action = 'inProgress';
        httpClientSpy.put.and.returnValue(of(todoMock[1]));

        service.changeStatus(boardId, todo, action).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                expect(data).toEqual(todoMock[1]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.put.calls.count()).toBe(1);
    });



    it('should delete todo and be truthy', (done: DoneFn) => {
        const todo = todoMock[1]
        httpClientSpy.delete.and.returnValue(of(todoMock[1]));

        service.delete(boardId, todo).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                expect(data).toEqual(todoMock[1]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.delete.calls.count()).toBe(1);
    });

});
describe('Comments', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let service: TodoService;
    let errorService: ErrorService;
    const boardId = boardMock[0]._id;


    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new TodoService(httpClientSpy, errorService);
    });


    it('should return all comments', (done: DoneFn) => {
        const todoId = todoMock[0]._id;
        httpClientSpy.get.and.returnValue(of(CommentMock));

        service.getComments(boardId, todoId).subscribe({
            next: data => {
                expect(data).toEqual(CommentMock);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should be OK returning no comments', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of([]));

        service.getComments(boardId, todoMock[0]._id).subscribe({
            next: data => {
                expect(data.length).toBe(0);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    })

    it('should create comment and be truthy', (done: DoneFn) => {
        const todoId = todoMock[0]._id;
        const title = 'test'
        httpClientSpy.post.and.returnValue(of(CommentMock[0]));

        service.postComments(boardId, todoId, title).subscribe({
            next: data => {
                expect(data).toEqual(CommentMock[0]);
                expect(data).toBeTruthy();
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.post.calls.count()).toBe(1);
    });

    it('should delete a comment and be truthy', (done: DoneFn) => {
        const todoId = todoMock[0]._id
        httpClientSpy.delete.and.returnValue(of(CommentMock[0]));

        service.deleteComments(boardId, todoId, CommentMock[0]).subscribe({
            next: data => {
                expect(data).toBeTruthy();
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.delete.calls.count()).toBe(1);
    });

})
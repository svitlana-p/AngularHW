import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TodoService } from './todo.service';
import { ErrorService } from './error.service';
import { todoMock } from '../../testing/mocks/todo-mock';
import { boardMock } from '../../testing/mocks/board-mock';
import { CommentMock } from '../../testing/mocks/comment-mock';


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
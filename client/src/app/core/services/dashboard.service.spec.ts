import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { boardMock } from '../../testing/mocks/board-mock';

import { DashboardService } from './dashboard.service';
import { ErrorService } from './error.service';


describe('dashboard service', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let service: DashboardService;
    let errorService: ErrorService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new DashboardService(httpClientSpy, errorService);
    });

    it('should return boards', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of(boardMock));

        service.getAll().subscribe({
            next: boards => {
                expect(boards).toEqual(boardMock);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should return one board', (done: DoneFn) => {
        const query = '6332bd2fe83f1322eb37ff10'
        httpClientSpy.get.and.returnValue(of(boardMock));

        service.getOne(query).subscribe({
            next: board => {
                expect(board[0]).toEqual(boardMock[0]);
                done();
            }
        });
        expect(httpClientSpy.get.calls.count()).toBe(1)
    });

    it('should be OK returning no boards', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of([]));

        service.getAll().subscribe({
            next: boards => {
                expect(boards.length).toBe(0);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count()).toBe(1);
    })
    it('should be truthy and return updated board', (done: DoneFn) => {
        const query = '6332bd2fe83f1322eb37ff10'
        httpClientSpy.put.and.returnValue(of(boardMock[0]));

        service.update(query, 'red', 'firstColor').subscribe({
            next: board => {
                expect(board).toBeTruthy();
                expect(board).toEqual(boardMock[0]);
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.put.calls.count()).toBe(1);
    })
    it('should create a board', (done: DoneFn) => {
        const board = boardMock[1];
        httpClientSpy.post.and.returnValue(of(boardMock[1]));

        service.create(board).subscribe({
            next: data => {
                expect(data).toEqual(board)
                expect(data).toBeTruthy();
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.post.calls.count()).toBe(1);
    })

    it('should edit user and be truthy', (done: DoneFn) => {
        const board = boardMock[2]
        httpClientSpy.patch.and.returnValue(of(board));

        service.edit(board).subscribe({
            next: data => {
                expect(data).toBeTruthy()
                expect(data).toEqual(board)
                done()
            },
            error: done.fail
        });
        expect(httpClientSpy.patch.calls.count()).toBe(1);
    });

    it('shoult delete user and be truthy', (done: DoneFn) => {
        const boardId = boardMock[0]._id;
        httpClientSpy.delete.and.returnValue(of(boardMock[0]));

        service.delete(boardId).subscribe({
            next: data => {
                expect(data).toBeTruthy()
                done()
            },
            error: done.fail
        });
        expect(httpClientSpy.delete.calls.count()).toBe(1);
    })
});


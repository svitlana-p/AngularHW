import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/mocks/board-mock';
import { todoMock } from 'src/app/mocks/todo-mock';
import { PopupService } from 'src/app/core/popup.service';
import { TodoService } from 'src/app/core/todo.service';
import { TodoserviceMock } from 'src/app/core/todo.service.mock';

import { TodosContainerComponent } from './todos-container.component';

describe('TodosContainerComponent', () => {
    let component: TodosContainerComponent;
    let fixture: ComponentFixture<TodosContainerComponent>;
    let todoService: TodoService;
    let popupService: PopupService;
    const boardId = boardMock[0]._id;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodosContainerComponent],
            imports: [
                RouterTestingModule,
            ],
            providers: [{
                provide: TodoService, useClass: TodoserviceMock
            },
                PopupService
            ]

        })
            .compileComponents();

        fixture = TestBed.createComponent(TodosContainerComponent);
        todoService = TestBed.inject(TodoService);
        popupService = TestBed.inject(PopupService);
        component = fixture.componentInstance;
        component.todo = todoMock[0];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoud called delete service method', () => {
        const spy = spyOn(todoService, 'delete').and.callThrough();
        component.boardId = boardId;
        fixture.debugElement.query(By.css('.del-button'))
            .triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledOnceWith(boardId, todoMock[0])
    });

    it('shoud called changeStatus service method', () => {
        const spy = spyOn(todoService, 'changeStatus').and.callThrough();
        component.boardId = boardId;
        fixture.debugElement.query(By.css('.archive'))
            .triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledOnceWith(boardId, todoMock[0], 'archive')
    });

    it('shoud called open service method', () => {
        const spy = spyOn(popupService, 'open')
        fixture.debugElement.query(By.css('.edit-button'))
            .triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalled()
    });
    it('shoud called open service method', () => {
        const spy = spyOn(popupService, 'open')
        fixture.debugElement.query(By.css('.todo-popup'))
            .triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalled()
    });

});

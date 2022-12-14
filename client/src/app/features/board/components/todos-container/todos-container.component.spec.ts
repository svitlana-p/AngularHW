import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/testing/mocks/board-mock';
import { todoMock } from 'src/app/testing/mocks/todo-mock';
import { PopupService } from 'src/app/core/services/popup.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoserviceMock } from 'src/app/testing/core/services/todo.service.mock';

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

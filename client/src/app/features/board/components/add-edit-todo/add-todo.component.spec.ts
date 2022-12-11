import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { todoMock } from 'src/app/testing/mocks/todo-mock';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoserviceMock } from 'src/app/core/services/todo.service.mock';
import { AddEditTodoComponent } from './add-todo.component';



describe('AddTodoComponent', () => {
    let component: AddEditTodoComponent;
    let fixture: ComponentFixture<AddEditTodoComponent>;
    let popupService: PopupService;
    let spinnerService: SpinnerService;
    let todoService: TodoService;
    const todo = todoMock[0];

    beforeEach(async () => { 
        await TestBed.configureTestingModule({
            declarations: [AddEditTodoComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [{
                provide: TodoService, useClass: TodoserviceMock
            },
                SpinnerService,
                PopupService,
                FormBuilder
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AddEditTodoComponent);
        component = fixture.componentInstance;
        popupService = TestBed.inject(PopupService);
        spinnerService = TestBed.inject(SpinnerService);
        todoService = TestBed.inject(TodoService)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    describe('Submit', () => {
        it('should called open and close service methods', () => {
            const spy = spyOn(spinnerService, 'open');
            const secondSpy = spyOn(spinnerService, 'close');
            const thirdSpy = spyOn(popupService, 'close');
            component.submit()
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
            expect(secondSpy).toHaveBeenCalled();
            expect(thirdSpy).toHaveBeenCalled();
        });
        it('should called create service method', () => {
            const spy = spyOn(todoService, 'create').and.callThrough();

            component.submit();

            expect(spy).toHaveBeenCalled()
        })
    })
    describe('Edit', () => {
        it('should called open am=nd close methods', () => {
            const spy = spyOn(spinnerService, 'open');
            const secondSpy = spyOn(spinnerService, 'close');
            const thirdSpy = spyOn(popupService, 'close');
            component.edit(todo)
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
            expect(secondSpy).toHaveBeenCalled();
            expect(thirdSpy).toHaveBeenCalled();
        });
        it('should called edit service method', () => {
            const spy = spyOn(todoService, 'edit').and.callThrough();

            component.edit(todo);

            expect(spy).toHaveBeenCalled()
        })
    })
});

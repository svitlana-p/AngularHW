import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PopupService } from 'src/app/services/popup.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoserviceMock } from 'src/app/services/todo.service-mock';
import { AddEditTodoComponent } from './add-todo.component';



describe('AddTodoComponent', () => {
    let component: AddEditTodoComponent;
    let fixture: ComponentFixture<AddEditTodoComponent>;
    let popupService: PopupService;
    let spinnerService: SpinnerService;
    let todoService: TodoService;

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
});

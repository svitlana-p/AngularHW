import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentMock } from 'src/app/testing/mocks/comment-mock';
import { todoMock } from 'src/app/testing/mocks/todo-mock';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoserviceMock } from 'src/app/testing/core/services/todo.service.mock';
import { CommentModalComponent } from './comment-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CommentModalComponent', () => {
    let component: CommentModalComponent;
    let fixture: ComponentFixture<CommentModalComponent>;
    let todoService: TodoService;
    let spinnerService: SpinnerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentModalComponent],
            imports: [
                RouterTestingModule,
                FormsModule,
                SharedModule
            ],
            providers: [{
                provide: TodoService, useClass: TodoserviceMock
            },
                SpinnerService,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommentModalComponent);
        todoService = TestBed.inject(TodoService);
        spinnerService = TestBed.inject(SpinnerService)
        component = fixture.componentInstance;
        component.todo = todoMock[0];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Submit', () => {
        it('should called open and close service methods', () => {
            const spy = spyOn(spinnerService, 'open');
            const secondSpy = spyOn(spinnerService, 'close');
            component.form.value.title = 'test';
            component.submit()
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
            expect(secondSpy).toHaveBeenCalled();
        });
        it('should called postComments service method', () => {
            const spy = spyOn(todoService, 'postComments').and.callThrough();
            component.boardId = 'test'
            component.todo = todoMock[0]
            component.form.value.title = 'test'
            component.submit();

            expect(spy).toHaveBeenCalled()
        })
    })

    describe('Delete', () => {
        it('should called open and close service methods', () => {
            const spy = spyOn(spinnerService, 'open');
            const secondSpy = spyOn(spinnerService, 'close');
            const comment = CommentMock[0];

            component.form.value.title = 'test';
            component.deleteComment(comment);
            fixture.detectChanges();

            expect(spy).toHaveBeenCalled();
            expect(secondSpy).toHaveBeenCalled();
        });

        it('should called delete service method', () => {
            const spy = spyOn(todoService, 'deleteComments').and.callThrough();
            const comment = CommentMock[0];

            component.form.value.title = 'test'
            component.deleteComment(comment);

            expect(spy).toHaveBeenCalled()
        })
    })
});

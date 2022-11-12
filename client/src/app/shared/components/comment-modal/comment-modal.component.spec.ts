import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentMock } from 'src/app/mocks/comment-mock';
import { todoMock } from 'src/app/mocks/todo-mock';
import { PopupService } from 'src/app/services/popup.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoserviceMock } from 'src/app/services/todo.service-mock';

import { CommentModalComponent } from './comment-modal.component';

describe('CommentModalComponent', () => {
    let component: CommentModalComponent;
    let fixture: ComponentFixture<CommentModalComponent>;
    let todoService: TodoService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentModalComponent],
            imports: [
                RouterTestingModule,
                FormsModule
            ],
            providers: [{
                provide: TodoService, useClass: TodoserviceMock
            },
                SpinnerService,
                PopupService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommentModalComponent);
        todoService = TestBed.inject(TodoService);
        component = fixture.componentInstance;
        component.todo = todoMock[0];        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

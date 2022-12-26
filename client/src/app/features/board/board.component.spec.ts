import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PopupService } from 'src/app/core/services/popup.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoserviceMock } from 'src/app/testing/core/services/todo.service.mock';
import { todoMock } from 'src/app/testing/mocks/todo-mock';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let popupService: PopupService;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
        DragDropModule
      ],
      providers: [
        {
          provide: TodoService, useClass: TodoserviceMock
        },
        PopupService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    popupService = TestBed.inject(PopupService);
    todoService = TestBed.inject(TodoService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should called open service method', () => {
    const spy = spyOn(popupService, 'open').and.callThrough();
    fixture.debugElement.query(By.css('.todo-add-button'))
      .triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled()
  });
  it('should set value', () => {
    component.choosePopupAdd();
    fixture.detectChanges();
    expect(component.popupButton).toEqual('add')
  });
  it('should filter todos', () => {
    component.onFilter({ filterTerm: 'archive' });
    fixture.detectChanges();
    expect(component.listFiltered).toEqual([todoMock[0]])
  });
  it('should sort todos', () => {
    component.onSort({ sortValue: 'createdAt', sortDirection: 'desc' });
    fixture.detectChanges();
    expect(component.listFiltered).toEqual(todoMock.reverse())
  });
  it('should set value', () => {
    component.onEdit({ popupButton: 'Edit', selectedTodo: todoMock[0] });
    fixture.detectChanges();
    expect(component.popupButton).toEqual('Edit');
    expect(component.editTodo).toEqual(todoMock[0])
  });
  it('should set value', () => {
    component.onComments({ popupButton: 'Comment', selectedTodo: todoMock[0] });
    fixture.detectChanges();
    expect(component.popupButton).toEqual('Comment');
    expect(component.todo).toEqual(todoMock[0])
  });
  it('should set color value', () => {
    component.onColorSelect({color:'white', element:'Todo'});
    fixture.detectChanges();
    expect(component.colors[0]).toEqual('white');
  });
  it('should called create service method', () => {
    component.boardId = 'test';
    const spy = spyOn(todoService, 'create').and.callThrough();
    component.onTaskAdd({ todo: todoMock[0] });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test', todoMock[0]);
  });
  it('should called edit service method', () => {
    component.boardId = 'test';
    const spy = spyOn(todoService, 'edit').and.callThrough();
    component.onTaskEdit({ todo: todoMock[0] });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test', todoMock[0]);
  });
  it('should called delete service method', () => {
    component.boardId = 'test';
    const spy = spyOn(todoService, 'delete').and.callThrough();
    component.onTaskDelete({ todo: todoMock[0] });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test', todoMock[0]);
  });
  it('should called change status service method', () => {
    component.boardId = 'test';
    const spy = spyOn(todoService, 'changeStatus').and.callThrough();
    component.onTaskArchive({ todo: todoMock[0] });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test', todoMock[0], 'archive');
  })
});

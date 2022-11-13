import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PopupService } from 'src/app/services/popup.service';
import { TodoService } from 'src/app/services/todo.service';
import { ColorPikerStubComponent, SortStubPipe, SpinnerStubComponent, TodoFilterStubPipe, TodoStubComponent, ToolbarStubComponent } from 'src/app/utils/todo.stub';
import { BoardPageComponent } from './board-page.component';
import { TodoserviceMock } from 'src/app/services/todo.service.mock';
import { HttpClientModule } from '@angular/common/http';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { By } from '@angular/platform-browser';

describe('BoardPageComponent', () => {
  let component: BoardPageComponent;
  let fixture: ComponentFixture<BoardPageComponent>;
  let popupService: PopupService;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardPageComponent,
        TodoStubComponent,
        ToolbarStubComponent,
        SpinnerStubComponent,
        ColorPikerStubComponent,
        TodoFilterStubPipe,
        SortStubPipe,
        CdkDropList
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,

      ],
      providers: [
        {
          provide: TodoService, useClass: TodoserviceMock
        },
        PopupService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardPageComponent);
    popupService = TestBed.inject(PopupService);
    todoService = TestBed.inject(TodoService)
    component = fixture.componentInstance;
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
  })

}); 

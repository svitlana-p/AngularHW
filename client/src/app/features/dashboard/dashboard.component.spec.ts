import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardServiceMock } from 'src/app/testing/core/services/dashboard.service.mock';
import { boardMock } from 'src/app/testing/mocks/board-mock';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: DashboardService;
  let popupService: PopupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SharedModule       
      ],
      providers: [
        {
          provide: DashboardService, useClass: DashboardServiceMock
        },
        PopupService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DashboardService);
    popupService = TestBed.inject(PopupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should called open service method', () => {
    const spy = spyOn(popupService, 'open').and.callThrough();
    fixture.debugElement.query(By.css('.popup-container'))
      .triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled()
  });
  it('should set value', () => {
    component.choosePopup();
    fixture.detectChanges();
    expect(component.popupButton).toEqual('add')
  });
  it('should filter boards', () => {
    component.onFilter({ filterTerm: 'work' });
    fixture.detectChanges();
    expect(component.boardListFiltered).toEqual([boardMock[0]])
  });
  it('should sort boards', () => {
    component.onSort({ sortValue: 'createdAt', sortDirection: 'desc' });
    fixture.detectChanges();
    expect(component.boardListFiltered).toEqual(boardMock.reverse())
  });
  it('should called create service method', () => {
    const spy = spyOn(service, 'create').and.callThrough();
    component.onBoardAdd({board: boardMock[0]})
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(boardMock[0])
  });
  it('should called edit service method', () => {
    const spy = spyOn(service, 'edit').and.callThrough();
    component.onBoardEdit({board: boardMock[0]})
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith(boardMock[0])
  });
  
  it('should called delete service method', () => {
    const spy = spyOn(service, 'delete').and.callThrough();
    component.onBoardDelete({boardId: 'test'})
    fixture.detectChanges()
    expect(spy).toHaveBeenCalledWith('test')
  });
});

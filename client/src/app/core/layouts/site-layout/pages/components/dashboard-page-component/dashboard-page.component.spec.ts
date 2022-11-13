import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/mocks/board-mock';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/services/dashboard.service.mock';
import { PopupService } from 'src/app/services/popup.service';
import { BoardStubComponent, DashbooardFilterStubPipe, SortStubPipe, ToolbarStubComponent } from 'src/app/utils/dashboard.stub';

import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let dashboardService: DashboardService;
  let popupService: PopupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPageComponent,
        BoardStubComponent,
        ToolbarStubComponent,
        DashbooardFilterStubPipe,
        SortStubPipe
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: DashboardService, useClass: DashboardServiceMock
        },
        PopupService,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    dashboardService = TestBed.inject(DashboardService);
    popupService = TestBed.inject(PopupService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called open method on service', () => {
    const spy = spyOn(popupService, 'open').and.callThrough();

    fixture.debugElement.query(By.css('.popup-container'))
      .triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled()
  })
  it('should set value of one variable', () => {
    component.choosePopupAdd();
    fixture.detectChanges();
    expect(component.popupButton).toEqual('add');
  })
  it('should set value of two variables', () => {
    component.choosePopupEdit(boardMock[0]);
    fixture.detectChanges();
    expect(component.popupButton).toEqual('edit')
    expect(component.editboard).toEqual(boardMock[0])
  })
});

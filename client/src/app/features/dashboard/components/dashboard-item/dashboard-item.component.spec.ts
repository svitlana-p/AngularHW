import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/testing/mocks/board-mock';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/testing/core/services/dashboard.service.mock';
import { PopupService } from 'src/app/core/services/popup.service';

import { DashboardItemComponent } from './dashboard-item.component';

describe('DashboardItemComponent', () => {
  let component: DashboardItemComponent;
  let fixture: ComponentFixture<DashboardItemComponent>;
  let router: Router;
  let dashboardService: DashboardService;
  let popupService: PopupService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [DashboardItemComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: DashboardService, useClass: DashboardServiceMock
        },
        PopupService
      ]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(DashboardItemComponent);
    dashboardService = TestBed.inject(DashboardService);
    popupService = TestBed.inject(PopupService);
    component = fixture.componentInstance;
    component.board = boardMock[0];
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should called open service method', () => {
    const spy = spyOn(popupService, 'open').and.callThrough();

    fixture.debugElement.query(By.css('.edit'))
      .triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled()
  })

}); 

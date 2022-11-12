import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/mocks/board-mock';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/services/dashboard.service-mock';
import { PopupService } from 'src/app/services/popup.service';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let router: Router;
  let dashboardService: DashboardService;
  let popupService: PopupService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
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

    fixture = TestBed.createComponent(BoardComponent);
    dashboardService = TestBed.inject(DashboardService);
    popupService = TestBed.inject(PopupService);
    component = fixture.componentInstance;
    component.board = boardMock[0];
    fixture.detectChanges();
  });

 
  it('should create', ()=> {
    expect(component).toBeTruthy()
  });

  it('shoud called delete service method',()=> {
    const spy = spyOn(dashboardService, 'delete').and.callThrough();

    fixture.debugElement.query(By.css('.delete'))
      .triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledOnceWith(boardMock[0]._id)
  })

  it('should called open service method', ()=> {
    const spy = spyOn(popupService, 'open').and.callThrough();

    fixture.debugElement.query(By.css('.edit'))
      .triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalled()
  })

}); 

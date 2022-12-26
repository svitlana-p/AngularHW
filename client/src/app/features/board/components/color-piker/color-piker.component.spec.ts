import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/testing/core/services/dashboard.service.mock';

import { ColorPikerComponent } from './color-piker.component';

describe('ColorPikerComponent', () => {
  let component: ColorPikerComponent;
  let fixture: ComponentFixture<ColorPikerComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorPikerComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [{
        provide: DashboardService, useClass: DashboardServiceMock
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ColorPikerComponent);
    dashboardService = TestBed.inject(DashboardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input value', () => {
    component.id = 'test';
    const input = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
    expect((input.nativeElement as HTMLElement).id).toBe('test')
  });

  it('should called setColor method', () => {

    spyOn(component, 'setColor').and.callThrough();
    fixture.debugElement.query(By.css('input'))
      .triggerEventHandler('change', null);

    expect(component.setColor).toHaveBeenCalled();
  });

});

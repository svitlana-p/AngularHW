import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/services/dashboard.service-mock';

import { ColorPikerComponent } from './color-piker.component';

describe('ColorPikerComponent', () => {
  let component: ColorPikerComponent;
  let fixture: ComponentFixture<ColorPikerComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPikerComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: DashboardService, useClass: DashboardServiceMock
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

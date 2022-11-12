import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/services/dashboard.service-mock';
import { PopupService } from 'src/app/services/popup.service';
import { SpinnerService } from 'src/app/services/spinner.service';

import { AddEditBoardComponent } from './add-edit-board.component';

describe('AddBoardComponent', () => {
    let component: AddEditBoardComponent;
    let fixture: ComponentFixture<AddEditBoardComponent>;
    let dashboardService: DashboardService;
    let popupService: PopupService;
    let spinnerService: SpinnerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddEditBoardComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [{
                provide: DashboardService, useClass: DashboardServiceMock
            },
                SpinnerService,
                PopupService,
                FormBuilder
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AddEditBoardComponent);
        dashboardService = TestBed.inject(DashboardService);
        popupService = TestBed.inject(PopupService);
        spinnerService = TestBed.inject(SpinnerService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should called open service method', () => {
    //     const spy = spyOn(popupService, 'open').and.callThrough();
    //     const control = fixture.debugElement.query(By.css('.popup-btn'));
    //     control.triggerEventHandler('submit', null);

    //     expect(spy).toHaveBeenCalled()
    // })
});

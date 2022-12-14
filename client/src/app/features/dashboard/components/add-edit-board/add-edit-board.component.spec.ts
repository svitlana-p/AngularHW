import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { boardMock } from 'src/app/testing/mocks/board-mock';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardServiceMock } from 'src/app/testing/core/services/dashboard.service.mock';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

import { AddEditBoardComponent } from './add-edit-board.component';

describe('AddBoardComponent', () => {
    let component: AddEditBoardComponent;
    let fixture: ComponentFixture<AddEditBoardComponent>;
    let dashboardService: DashboardService;
    let popupService: PopupService;
    let spinnerService: SpinnerService;
    const board = boardMock[0];

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
        component.board = board;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    describe('Submit', () => {
        it('should called open and close service methods', () => {
            const spy = spyOn(popupService, 'close');
            component.submit()
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        });

    })
    describe('Edit', () => {
        it('should called open am=nd close methods', () => {
            const spy = spyOn(popupService, 'close');
            component.edit(board)
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        });
        
    })

});

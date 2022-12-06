import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/auth.service';
import { AuthServiceMock } from 'src/app/core/auth.service.mock';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let router: Router;
    let authService: AuthService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent,],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceMock,
                },
            ]
        })

            .compileComponents();
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');


        fixture = TestBed.createComponent(CardComponent);
        authService = TestBed.inject(AuthService)
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    describe('Submit', () => {
        it('should called login service method', () => {
            const spy = spyOn(authService, 'login').and.callThrough();
            component.buttonName = 'Log In'
            component.onSubmit()
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalled()
        });

        it('should called register service method', () => {
            const spy = spyOn(authService, 'register').and.callThrough();
            component.buttonName = 'Sign Up'
            component.onSubmit()
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalled()
        });
    })


});

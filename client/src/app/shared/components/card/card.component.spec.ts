import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from 'src/app/services/auth.service-mock';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let router: Router;
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy()
    })

});

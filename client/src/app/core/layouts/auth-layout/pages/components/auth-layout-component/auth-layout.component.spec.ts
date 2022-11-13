import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
    let component: AuthLayoutComponent;
    let fixture: ComponentFixture<AuthLayoutComponent>;
    let router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthLayoutComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AuthLayoutComponent);
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

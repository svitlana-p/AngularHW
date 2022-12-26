import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthServiceMock } from 'src/app/testing/core/services/auth.service.mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [{
        provide: AuthService, useClass: AuthServiceMock
      }]
    })
      .compileComponents();
      router = TestBed.inject(Router);
        spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Submit', () => {
    it('should called login service method', () => {
      const spy = spyOn(authService, 'login').and.callThrough();
      component.onSubmit()
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard'])
    });
  });
});
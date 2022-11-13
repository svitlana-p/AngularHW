
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/components/core.module';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { PopupService } from './services/popup.service';
import { SpinnerService } from './services/spinner.service';
import { TodoService } from './services/todo.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthService, DashboardService, TodoService, PopupService, SpinnerService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
});

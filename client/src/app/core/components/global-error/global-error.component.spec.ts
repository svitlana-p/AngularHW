import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorService } from 'src/app/services/error.service';

import { GlobalErrorComponent } from './global-error.component';

describe('GlobalErrorComponent', () => {
  let component: GlobalErrorComponent;
  let fixture: ComponentFixture<GlobalErrorComponent>;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalErrorComponent ],
      providers: [ErrorService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalErrorComponent);
    errorService = TestBed.inject(ErrorService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called clear method of service', ()=> {
    const spy = spyOn(errorService, 'clear').and.callThrough();

    component.clear()

    expect(spy).toHaveBeenCalled()
  })
});


import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true', () => {
    service.open()
    service.isVisible$.subscribe({
      next: value => {
        expect(value).toBeTrue()
      }
    })
  });

  it('should return false', () => {
    service.close()
    service.isVisible$.subscribe({
      next: value => {
        expect(value).toBeFalse()
      }
    })
  });
});

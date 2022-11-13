import { TestBed } from '@angular/core/testing';

import { PopupService } from './popup.service';

describe('PopupService open and close popup', () => {
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true', () => {
    service.open()
    service.isVisible$.subscribe({
      next: (value) => {
        expect(value).toBeTrue()
      }
    })
  });

  it('should return false', () => {
    service.close()
    service.isVisible$.subscribe({
      next: (value) => {
        expect(value).toBeFalse()
      }
    })
  });
});

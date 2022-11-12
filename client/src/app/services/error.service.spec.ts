import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';



describe('Error service', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return error message', (done: DoneFn)=> {
    const message = 'error message';
    service.handle(message);
    service.error$.subscribe({
        next: value => {
            expect(value).toEqual(message);
            done();
        },
        error: done.fail
    })
  });

  it('should clear error message', (done: DoneFn)=> {
    service.clear();
    service.error$.subscribe({
        next: value => {
            expect(value).toEqual('');
            done();
        },
        error: done.fail
    })
  });

});

import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log messages using console.log', () => {
    spyOn(console, 'log');

    const message = 'Test log message';
    service.log(message);

    expect(console.log).toHaveBeenCalledWith(message);
  });

  it('should log errors using console.error', () => {
    spyOn(console, 'error');

    const errorMessage = 'Test error message';
    service.error(errorMessage);

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle multiple arguments in log method', () => {
    spyOn(console, 'log');

    const arg1 = 'First message';
    const arg2 = 'Second message';
    service.log(arg1, arg2);

    expect(console.log).toHaveBeenCalledWith(arg1, arg2);
  });

  it('should handle multiple arguments in error method', () => {
    spyOn(console, 'error');

    const arg1 = 'First error';
    const arg2 = 'Second error';
    service.error(arg1, arg2);

    expect(console.error).toHaveBeenCalledWith(arg1, arg2);
  });
});

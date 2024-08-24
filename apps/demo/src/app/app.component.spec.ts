import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loggerSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(async () => {
    const loggerMock = jasmine.createSpyObj('LoggingService', ['log', 'error']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: LoggingService, useValue: loggerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loggerSpy = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;

    // Trigger ngOnInit manually
    component.ngOnInit();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Valant demo'`, () => {
    expect(component.title).toEqual('Valant demo');
  });

  it('should initialize data array as undefined', () => {
    expect(component.data).toBeUndefined();
  });

});

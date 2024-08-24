import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeUploaderComponent } from './maze-uploader.component';
import { MazeService } from '../../services/maze.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MazeUploaderComponent', () => {
  let component: MazeUploaderComponent;
  let fixture: ComponentFixture<MazeUploaderComponent>;
  let mockMazeService: jasmine.SpyObj<MazeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockMazeService = jasmine.createSpyObj('MazeService', ['uploadMaze']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    // Use a plain object for ActivatedRoute if no methods are used
    mockActivatedRoute = {} as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [MazeUploaderComponent],
      providers: [
        { provide: MazeService, useValue: mockMazeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeUploaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload a file and navigate on successful upload', () => {
    const mockFile = new File(['maze data'], 'maze.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };
    
    mockMazeService.uploadMaze.and.returnValue(of({}));

    spyOn(window, 'alert');

    component.onFileSelected(mockEvent);

    expect(mockMazeService.uploadMaze).toHaveBeenCalledWith(mockFile);
    expect(window.alert).toHaveBeenCalledWith('Maze uploaded successfully');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../select'], { relativeTo: mockActivatedRoute });
  });

  it('should show an alert on upload failure', () => {
    const mockFile = new File(['maze data'], 'maze.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };
    const mockError = new Error('Upload failed');

    mockMazeService.uploadMaze.and.returnValue(throwError(mockError));

    spyOn(window, 'alert');

    component.onFileSelected(mockEvent);

    expect(mockMazeService.uploadMaze).toHaveBeenCalledWith(mockFile);
    expect(window.alert).toHaveBeenCalledWith('Failed to upload maze: ' + mockError.message);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not attempt to upload if no file is selected', () => {
    const mockEvent = { target: { files: [] } };

    component.onFileSelected(mockEvent);

    expect(mockMazeService.uploadMaze).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});

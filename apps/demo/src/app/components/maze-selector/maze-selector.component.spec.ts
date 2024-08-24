import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeSelectorComponent } from './maze-selector.component';
import { MazeService } from '../../services/maze.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MazeSelectorComponent', () => {
  let component: MazeSelectorComponent;
  let fixture: ComponentFixture<MazeSelectorComponent>;
  let mockMazeService: jasmine.SpyObj<MazeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any; // Adjusted type here

  beforeEach(async () => {
    mockMazeService = jasmine.createSpyObj('MazeService', ['getAvailableMazes', 'selectMaze']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {}; // Removed createSpyObj, replaced with a plain object

    await TestBed.configureTestingModule({
      declarations: [MazeSelectorComponent],
      providers: [
        { provide: MazeService, useValue: mockMazeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load available mazes on ngOnInit', () => {
    const mockMazes = ['Maze1', 'Maze2', 'Maze3'];
    mockMazeService.getAvailableMazes.and.returnValue(of(mockMazes));

    component.ngOnInit();
    
    expect(mockMazeService.getAvailableMazes).toHaveBeenCalled();
    expect(component.mazes).toEqual(mockMazes);
  });

  it('should select a maze and navigate to maze navigator', () => {
    const selectedMaze = 'Maze1';
    component.mazes = ['Maze1', 'Maze2', 'Maze3'];

    component.onSelectMaze(selectedMaze);

    expect(mockMazeService.selectMaze).toHaveBeenCalledWith(selectedMaze);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../navigate'], { relativeTo: mockActivatedRoute });
  });

  it('should not navigate if maze selection fails', () => {
    const selectedMaze = 'Maze1';
    mockMazeService.selectMaze.and.throwError('Selection failed');

    try {
      component.onSelectMaze(selectedMaze);
    } catch (error) {
      // Handle expected error
    }

    expect(mockMazeService.selectMaze).toHaveBeenCalledWith(selectedMaze);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});

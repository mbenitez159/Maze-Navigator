import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeNavigatorComponent } from './maze-navigator.component';
import { NavigatorService } from '../../services/navigator.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MazeViewerComponent } from '../maze-viewer/maze-viewer.component';

// Import the module that declares app-maze-viewer if it's part of a module

describe('MazeNavigatorComponent', () => {
  let component: MazeNavigatorComponent;
  let fixture: ComponentFixture<MazeNavigatorComponent>;
  let mockNavigatorService: jasmine.SpyObj<NavigatorService>;

  beforeEach(async () => {
    mockNavigatorService = jasmine.createSpyObj('NavigatorService', [
      'loadMaze',
      'getCurrentMaze',
      'getCurrentPosition',
      'move',
      'getPotentialPosition',
      'isMovePossible',
      'reset',
      'mazeCompleted'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ 
        MazeNavigatorComponent,
        MazeViewerComponent // Declare the component if it's part of the module
      ],
      providers: [
        { provide: NavigatorService, useValue: mockNavigatorService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this if `app-maze-viewer` is a web component
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeNavigatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize maze and position on ngOnInit', () => {
    const mockMaze = [['O', 'O'], ['O', 'P']];
    const mockPosition = { x: 1, y: 1 };
    
    mockNavigatorService.getCurrentMaze.and.returnValue(mockMaze);
    mockNavigatorService.getCurrentPosition.and.returnValue(mockPosition);
    
    component.ngOnInit();
    
    expect(mockNavigatorService.loadMaze).toHaveBeenCalled();
    expect(component.currentMaze).toEqual(mockMaze);
    expect(component.currentPosition).toEqual(mockPosition);
  });

  it('should navigate correctly and update position and maze on onNavigate', () => {
    const mockPosition = { x: 1, y: 1 };
    const updatedPosition = { x: 1, y: 2 };
    const mockMaze = [['O', 'O'], ['O', 'P']];
    
    mockNavigatorService.getCurrentMaze.and.returnValue(mockMaze);
    mockNavigatorService.getCurrentPosition.and.returnValue(mockPosition);

    component.ngOnInit();
    expect(component.currentPosition).toEqual(mockPosition);
    
    mockNavigatorService.move.and.callFake(() => {
      mockNavigatorService.getCurrentPosition.and.returnValue(updatedPosition);
    });
    
    component.onNavigate('East');
    
    expect(mockNavigatorService.move).toHaveBeenCalledWith('East');
    expect(component.currentPosition).toEqual(updatedPosition);
    expect(component.currentMaze[1][1]).toBe('O');
    expect(component.currentMaze[1][2]).toBe('P');
  });

  it('should reset maze state on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockNavigatorService.reset).toHaveBeenCalled();
  });

  it('should return true when maze is completed', () => {
    mockNavigatorService.mazeCompleted = true;
    expect(component.isMazeCompleted()).toBeTrue();
  });

  it('should return false when maze is not completed', () => {
    mockNavigatorService.mazeCompleted = false;
    expect(component.isMazeCompleted()).toBeFalse();
  });

  it('should correctly determine if a move is possible', () => {
    const mockDirection = 'North';
    const mockPotentialPosition = { x: 0, y: 1 };
    
    mockNavigatorService.getPotentialPosition.and.returnValue(mockPotentialPosition);
    mockNavigatorService.isMovePossible.and.returnValue(true);
    
    expect(component.isMovePossible(mockDirection)).toBeTrue();
    expect(mockNavigatorService.getPotentialPosition).toHaveBeenCalledWith(mockDirection);
    expect(mockNavigatorService.isMovePossible).toHaveBeenCalledWith(mockPotentialPosition.x, mockPotentialPosition.y);
  });

  it('should not move when move is not possible', () => {
    const mockDirection = 'West';
    const mockPotentialPosition = { x: -1, y: 0 };

    mockNavigatorService.getPotentialPosition.and.returnValue(mockPotentialPosition);
    mockNavigatorService.isMovePossible.and.returnValue(false);

    expect(component.isMovePossible(mockDirection)).toBeFalse();
    expect(mockNavigatorService.getPotentialPosition).toHaveBeenCalledWith(mockDirection);
    expect(mockNavigatorService.isMovePossible).toHaveBeenCalledWith(mockPotentialPosition.x, mockPotentialPosition.y);
  });

  it('should smooth scroll to position on loadtoPosition', (done) => {
    spyOn(window, 'scrollBy');

    component.loadtoPosition();

    setTimeout(() => {
      expect(window.scrollBy).toHaveBeenCalled();
      done();
    }, 500); // Longer than the totalScrollAmount + scrollInterval
  });

});

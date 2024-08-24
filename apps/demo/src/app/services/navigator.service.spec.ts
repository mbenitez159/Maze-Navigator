import { TestBed } from '@angular/core/testing';
import { NavigatorService } from './navigator.service';
import { MazeService } from './maze.service';

describe('NavigatorService', () => {
  let service: NavigatorService;
  let mockMazeService: jasmine.SpyObj<MazeService>;

  beforeEach(() => {
    mockMazeService = jasmine.createSpyObj('MazeService', ['getSelectedMaze']);

    TestBed.configureTestingModule({
      providers: [
        NavigatorService,
        { provide: MazeService, useValue: mockMazeService }
      ]
    });

    service = TestBed.inject(NavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadMaze', () => {
    it('should load the maze and set the initial position', () => {
      const mazeStr = 'S...\n....\n...E';
      const parsedMaze = [
        ['S', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', 'E']
      ];

      mockMazeService.getSelectedMaze.and.returnValue(mazeStr);

      service.loadMaze();

      expect(service.getCurrentMaze()).toEqual(parsedMaze);
      expect(service.getCurrentPosition()).toEqual({ x: 0, y: 0 });
    });

    it('should not change maze or position if maze string is null or undefined', () => {
      mockMazeService.getSelectedMaze.and.returnValue(null);

      service.loadMaze();

      expect(service.getCurrentMaze()).toEqual([]);
      expect(service.getCurrentPosition()).toEqual({ x: 0, y: 0 });
    });
  });

  describe('getNavigationOptions', () => {
    it('should return an empty array if no moves are possible', () => {
      const maze = [
        ['X', 'X', 'X'],
        ['X', 'X', 'X']
      ];
      const position = { x: 0, y: 0 };

      service['maze'] = maze;
      service['position'] = position;

      expect(service.getNavigationOptions()).toEqual([]);
    });
  });

  describe('move', () => {
    it('should not move if the move is not possible', () => {
      const maze = [
        ['S', 'X', 'E'],
        ['.', '.', '.']
      ];
      const startPosition = { x: 0, y: 0 };

      service['maze'] = maze;
      service['position'] = startPosition;

      service.move('East');

      expect(service.getCurrentPosition()).toEqual(startPosition); // No move should be made
      expect(service.mazeCompleted).toBeFalse();
    });
  });

  describe('reset', () => {
    it('should reset the maze, position, and mazeCompleted flag', () => {
      service.reset();

      expect(service.getCurrentMaze()).toEqual([]);
      expect(service.getCurrentPosition()).toEqual({ x: 0, y: 0 });
      expect(service.mazeCompleted).toBeFalse();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { MazeService } from './maze.service';
import { LoggingService } from '../logging/logging.service';
import { ApiClient } from '../api-client/api-client';
import { MazeResponse } from '../models/maze-response';

describe('MazeService', () => {
  let service: MazeService;
  let apiClientSpy: jasmine.SpyObj<ApiClient>;
  let loggerSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const apiClientMock = jasmine.createSpyObj('ApiClient', ['uploadMaze', 'maze']);
    const loggerMock = jasmine.createSpyObj('LoggingService', ['error']);

    // Initialize the mock's maze method to return an empty maze response
    apiClientMock.maze.and.returnValue(of({ items: [], totalPages: 0 }));

    TestBed.configureTestingModule({
      providers: [
        MazeService,
        { provide: ApiClient, useValue: apiClientMock },
        { provide: LoggingService, useValue: loggerMock }
      ]
    });

    // Inject the service and spies after setting up the mock return values
    service = TestBed.inject(MazeService);
    apiClientSpy = TestBed.inject(ApiClient) as jasmine.SpyObj<ApiClient>;
    loggerSpy = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
  });

  describe('uploadMaze', () => {
    it('should upload a valid maze and add it to the list', (done) => {
      const file = new File(['SXXE'], 'test.maze');
      spyOn(service as any, 'isValidMaze').and.returnValue(true);
      spyOn(service as any, 'formatMaze').and.callThrough();
      apiClientSpy.uploadMaze.and.returnValue(of(void 0));

      service.uploadMaze(file).subscribe({
        next: () => {
          expect(apiClientSpy.uploadMaze).toHaveBeenCalledWith('test', 'SXXE');
          expect(service['mazes'].length).toBe(1);
          done();
        },
        error: () => {
          fail('Expected successful upload');
        }
      });
    });

    it('should return an error for invalid maze format', (done) => {
      const file = new File(['invalid-maze'], 'test.maze');
      spyOn(service as any, 'isValidMaze').and.returnValue(false);

      service.uploadMaze(file).subscribe({
        next: () => {
          fail('Expected error due to invalid maze');
          done();
        },
        error: (error) => {
          expect(error).toEqual(new Error('Invalid maze format.'));
          done();
        }
      });
    });

    it('should log and return an error if the upload fails', (done) => {
      const file = new File(['SXXE'], 'test.maze');
      spyOn(service as any, 'isValidMaze').and.returnValue(true);
      apiClientSpy.uploadMaze.and.returnValue(throwError(() => new Error('Upload failed')));

      service.uploadMaze(file).subscribe({
        next: () => {
          fail('Expected error due to upload failure');
        },
        error: (error) => {
          expect(loggerSpy.error).toHaveBeenCalledWith('Error uploading maze: ', error);
          expect(error).toEqual(new Error('Upload failed'));
          done();
        }
      });
    });
  });

  describe('getAvailableMazes', () => {
    it('should return the list of available mazes', () => {
      const mazeResponse: MazeResponse = {
        items: [
          { id: 1, name: 'Maze 1', uploadedAt: new Date().toLocaleString(), definition: 'SXXE' }
        ],
        totalPages: 0
      };
      // Set the mock to return a response with the maze data
      apiClientSpy.maze.and.returnValue(of(mazeResponse));

      service.getAvailableMazes().subscribe((mazes) => {
        expect(mazes).toEqual(['SXXE']);
      });
    });
  });

  describe('selectMaze', () => {
    it('should select a maze', () => {
      const maze = 'SXXE';
      service.selectMaze(maze);
      expect(service.getSelectedMaze()).toBe(maze);
    });
  });

  describe('getSelectedMaze', () => {
    it('should return the selected maze', () => {
      service['selectedMaze'] = 'SXXE';
      expect(service.getSelectedMaze()).toBe('SXXE');
    });
  });

  describe('updateMaze', () => {
    it('should update the mazes subject with new data', () => {
      const mazeResponse: MazeResponse = {
        items: [
          { id: 1, name: 'Maze 1', uploadedAt: new Date().toLocaleString(), definition: 'SXXE' }
        ],
        totalPages: 0
      };
      // Set the mock to return a response with maze data
      apiClientSpy.maze.and.returnValue(of(mazeResponse));

      service['updateMaze']();

      service.getAvailableMazes().subscribe((mazes) => {
        expect(mazes).toEqual(['SXXE']);
      });
    });

    it('should log an error if updating mazes fails', () => {
      const error = new Error('Update failed');
      apiClientSpy.maze.and.returnValue(throwError(() => error));

      service['updateMaze']();
      expect(loggerSpy.error).toHaveBeenCalledWith('Error getting mazes: ', error);
    });
  });

  describe('formatMaze', () => {
    it('should correctly format maze content', () => {
      const content = `SXX \n EXX `;
      expect((service as any).formatMaze(content)).toBe('SXX\nEXX');
    });
  });

  describe('isValidMaze', () => {
    it('should return true for valid maze content', () => {
      const content = 'SXXE\nXXXX';
      expect((service as any).isValidMaze(content)).toBeTrue();
    });

    it('should return false for invalid maze content', () => {
      const content = 'invalid-maze';
      expect((service as any).isValidMaze(content)).toBeFalse();
    });

    it('should return false if maze content has unequal row lengths', () => {
      const content = 'SXXE\nXXX';
      expect((service as any).isValidMaze(content)).toBeFalse();
    });

    it('should return false if maze content does not contain exactly one S and one E', () => {
      const content = 'SXXX\nXXXX';
      expect((service as any).isValidMaze(content)).toBeFalse();
    });
  });

  describe('extractMazeName', () => {
    it('should correctly extract the maze name from a file name', () => {
      const fileName = 'maze.txt';
      expect((service as any).extractMazeName(fileName)).toBe('maze');
    });
  });
});

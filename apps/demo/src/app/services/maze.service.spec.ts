/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MazeService } from './maze.service';

describe('Service: Maze', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MazeService]
    });
  });

  it('should ...', inject([MazeService], (service: MazeService) => {
    expect(service).toBeTruthy();
  }));
});

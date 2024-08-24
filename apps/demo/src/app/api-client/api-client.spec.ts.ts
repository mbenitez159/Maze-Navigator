import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiClient, API_BASE_URL } from './api-client';
import { of, throwError } from 'rxjs';
import { MazeResponse } from '../models/maze-response';

describe('ApiClient', () => {
  let client: ApiClient;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [
        ApiClient,
        { provide: HttpClient, useValue: spy },
        { provide: API_BASE_URL, useValue: 'http://localhost' }
      ]
    });

    client = TestBed.inject(ApiClient);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should upload maze', () => {
    const mockName = 'Test Maze';
    const mockDefinition = '####';
    httpClientSpy.post.and.returnValue(of(void 0)); // Mock the post call

    client.uploadMaze(mockName, mockDefinition).subscribe(
      result => expect(result).toBeUndefined(),
      fail // If an error occurs, the test should fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe('http://localhost/api/Maze/upload');
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual(JSON.stringify({ name: mockName, definition: mockDefinition }));
  });

  it('should handle maze retrieval', () => {
    const mockResponse: MazeResponse = { items: [], totalPages: 1 };
    httpClientSpy.get.and.returnValue(of(mockResponse)); // Mock the get call

    client.maze().subscribe(
      response => expect(response).toEqual(mockResponse),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe('http://localhost/api/Maze?pageNumber=1&pageSize=10');
  });

  it('should handle errors', () => {
    const errorResponse = new ErrorEvent('Network error', {
      message: 'Simulated network error',
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse)); // Mock an error response

    client.uploadMaze('Test Maze', '####').subscribe(
      () => fail('expected an error, not a successful upload'),
      error => expect(error.message).toContain('Simulated network error')
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});

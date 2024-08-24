import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MazeResponse } from '../models/maze-response';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.baseUrl = baseUrl ?? '';
  }

  uploadMaze(name: string, definition: string): Observable<void> {
    const url = `${this.baseUrl}/api/Maze/upload`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ name, definition });

    return this.http.post<void>(url, body, { headers })
      .pipe(
        catchError(this.handleError<void>('uploadMaze'))
      );
  }

  maze(pageNumber: number = 1, pageSize: number = 10): Observable<MazeResponse> {
    const url = `${this.baseUrl}/api/Maze?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return this.http.get<MazeResponse>(url, { headers })
      .pipe(
        catchError(this.handleError<MazeResponse>('maze', { items: [], totalPages: 0 }))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(error));
    };
  }
}

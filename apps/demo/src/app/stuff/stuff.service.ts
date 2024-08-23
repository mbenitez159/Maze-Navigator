import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';
import { MazeResponse } from '../models/maze-response';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getStuff(): Observable<MazeResponse> {
    return this.httpClient.maze();
  }
}

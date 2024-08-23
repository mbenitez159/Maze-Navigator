import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StuffService } from '../stuff/stuff.service';
import { LoggingService } from '../logging/logging.service';
import { MazeResponse } from '../models/maze-response';


@Injectable({
  providedIn: 'root'
})
export class MazeService {



  constructor(private client: StuffService,private logger: LoggingService) {
    client.getStuff().subscribe({
      next: (response: MazeResponse) => {
        this.mazes = response.mazes.map(maze=> maze.definition);
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });

    
  }
  private mazes: string[] = [];
  private selectedMaze: string | null = null;

  uploadMaze(file: File): Observable<void> {
    return new Observable<void>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.mazes.push(reader.result as string);
        observer.next();
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsText(file);
    });
  }

  getAvailableMazes(): string[] {
    return this.mazes;
  }

  selectMaze(maze: string): void {
    this.selectedMaze = maze;
  }

  getSelectedMaze(): string | null {
    return this.selectedMaze;
  }

}

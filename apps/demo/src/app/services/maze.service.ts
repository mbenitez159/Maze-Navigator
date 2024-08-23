import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { StuffService } from '../stuff/stuff.service';
import { LoggingService } from '../logging/logging.service';
import { MazeResponse } from '../models/maze-response';
import { ValantDemoApiClient } from '../api-client/api-client';


@Injectable({
  providedIn: 'root'
})
export class MazeService {



  constructor(private client: ValantDemoApiClient.Client,private logger: LoggingService) {
    client.maze().subscribe({
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
        const content = reader.result as string;

        // Validate and format the maze
        const formattedMaze = this.formatMaze(content);
        if (!this.isValidMaze(formattedMaze)) {
          observer.error(new Error('Invalid maze format.'));
          return;
        }

        const mazeName = this.extractMazeName(file.name);
        this.client.uploadMaze(mazeName, formattedMaze).pipe(
          catchError((error) => {
            this.logger.error('Error uploading maze: ', error);
            observer.error(error);
            return of<void>();
          })
        ).subscribe({
          next: () => {
            this.mazes.push(formattedMaze);
            observer.next();
            observer.complete();
          }
        });
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

  private formatMaze(content: string): string {
    return content.trim().split('\n').map(line => line.trim()).join('\n');
  }

  private isValidMaze(content: string): boolean {
    const lines = content.split('\n');
    if (lines.length < 2) return false; // Minimal maze size

    const expectedLength = lines[0].length;

    // Ensure all rows have the same length and contain only valid characters
    for (const line of lines) {
      if (line.length !== expectedLength || !/^[SOEX]{1}[OX]+[SOEX]{1}$/.test(line)) {
        return false;
      }
    }

    // Ensure there's exactly one 'S' and one 'E'
    const startCount = (content.match(/S/g) || []).length;
    const endCount = (content.match(/E/g) || []).length;

    return startCount === 1 && endCount === 1;
  }

  private extractMazeName(fileName: string): string {
    return fileName.split('.').slice(0, -1).join('.');
  }

}

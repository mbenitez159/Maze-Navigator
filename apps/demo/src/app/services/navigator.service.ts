import { Injectable } from '@angular/core';
import { MazeService } from './maze.service';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  public mazeCompleted = false;
  private maze: string[][] = [];
  private position: { x: number, y: number } = { x: 0, y: 0 };

  constructor(private mazeService: MazeService) {}

  loadMaze(): void {
    const mazeStr = this.mazeService.getSelectedMaze();
    if (mazeStr) {
      this.maze = this.parseMaze(mazeStr);
      this.position = this.findStartPosition(this.maze);
    }
  }

  getCurrentMaze(): string[][] {
    return this.maze;
  }

  getCurrentPosition(): { x: number, y: number } {
    return this.position;
  }

  getNavigationOptions(): string[] {
    const options = [];
    if (this.isMovePossible(this.position.x - 1, this.position.y)) options.push('North');
    if (this.isMovePossible(this.position.x + 1, this.position.y)) options.push('South');
    if (this.isMovePossible(this.position.x, this.position.y - 1)) options.push('West');
    if (this.isMovePossible(this.position.x, this.position.y + 1)) options.push('East');
    return options;
  }

  move(direction: string): void {
    const newPosition = this.getPotentialPosition(direction);
    if (this.isMovePossible(newPosition.x, newPosition.y)) {
      this.position = newPosition;
      if (this.maze[this.position.x][this.position.y] === 'E') {
        this.mazeCompleted = true;
      }
    }
  }

  getPotentialPosition(direction: string): { x: number, y: number } {
    let newPosition = { ...this.position };
    switch (direction) {
      case 'North':
        newPosition.x--;
        break;
      case 'South':
        newPosition.x++;
        break;
      case 'West':
        newPosition.y--;
        break;
      case 'East':
        newPosition.y++;
        break;
    }
    return newPosition;
  }
  
  reset(): void {
    this.maze = [];
    this.position = { x: 0, y: 0 };
    this.mazeCompleted = false;
  }

  private parseMaze(mazeStr: string): string[][] {
    return mazeStr.trim().split('\n').map(row => row.split(''));
  }

  private findStartPosition(maze: string[][]): { x: number, y: number } {
    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[x].length; y++) {
        if (maze[x][y] === 'S') {
          return { x, y };
        }
      }
    }
    return { x: 0, y: 0 };
  }

  isMovePossible(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.maze.length && y < this.maze[0].length && this.maze[x][y] !== 'X';
  }

}

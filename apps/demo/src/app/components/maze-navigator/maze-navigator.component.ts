import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-maze-navigator',
  templateUrl: './maze-navigator.component.html',
  styleUrls: ['./maze-navigator.component.css']
})
export class MazeNavigatorComponent implements OnInit {

  currentMaze: string[][] = [];
  currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  navigationOptions: string[] = ['North', 'South', 'West', 'East'];


  constructor(private navigatorService: NavigatorService) {}

  ngOnInit(): void {
    this.navigatorService.loadMaze();
    this.currentMaze = this.navigatorService.getCurrentMaze();
    this.currentPosition = this.navigatorService.getCurrentPosition();
  }

  onNavigate(direction: string): void {
    this.navigatorService.move(direction);
    this.currentPosition = this.navigatorService.getCurrentPosition();
    this.updateMazeWithPosition();
  }
  private updateMazeWithPosition(): void {
    // Reset previous position
    this.currentMaze = this.currentMaze.map(row => 
      row.map(cell => cell === 'P' ? 'O' : cell)
    );

    // Mark current position
    this.currentMaze[this.currentPosition.x][this.currentPosition.y] = 'P';
  }

  isMazeCompleted(): boolean
  {
    return this.navigatorService.mazeCompleted;
  }

  isMovePossible(direction: string): boolean {
    const newPosition = this.navigatorService.getPotentialPosition(direction);
    return this.navigatorService.isMovePossible(newPosition.x, newPosition.y);
  }


  ngOnDestroy(): void {
    // Reset the service state when the component is destroyed
    this.navigatorService.reset();
  }

}

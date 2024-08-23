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
  navigationOptions: string[] = [];

  constructor(private navigatorService: NavigatorService) {}

  ngOnInit(): void {
    this.navigatorService.loadMaze();
    this.currentMaze = this.navigatorService.getCurrentMaze();
    this.currentPosition = this.navigatorService.getCurrentPosition();
    this.navigationOptions = this.navigatorService.getNavigationOptions();
  }

  onNavigate(direction: string): void {
    this.navigatorService.move(direction);
    this.currentPosition = this.navigatorService.getCurrentPosition();
    this.updateMazeWithPosition();
    this.navigationOptions = this.navigatorService.getNavigationOptions();
  }
  private updateMazeWithPosition(): void {
    // Reset previous position
    this.currentMaze = this.currentMaze.map(row => 
      row.map(cell => cell === 'P' ? 'O' : cell)
    );

    // Mark current position
    this.currentMaze[this.currentPosition.x][this.currentPosition.y] = 'P';
  }

}

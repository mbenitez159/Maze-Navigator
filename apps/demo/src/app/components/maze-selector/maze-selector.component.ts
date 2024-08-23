import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';

@Component({
  selector: 'app-maze-selector',
  templateUrl: './maze-selector.component.html',
  styleUrls: ['./maze-selector.component.css']
})
export class MazeSelectorComponent implements OnInit {

  mazes: string[] = [];

  constructor(private mazeService: MazeService) {}

  ngOnInit(): void {
    this.mazes = this.mazeService.getAvailableMazes();
  }

  onSelectMaze(maze: string): void {
    this.mazeService.selectMaze(maze);
  }

}

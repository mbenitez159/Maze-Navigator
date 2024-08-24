import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maze-selector',
  templateUrl: './maze-selector.component.html',
  styleUrls: ['./maze-selector.component.css']
})
export class MazeSelectorComponent implements OnInit {

  mazes: string[] = [];

  constructor(private mazeService: MazeService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.mazeService.getAvailableMazes().subscribe((mazes) => {
      this.mazes = mazes;
    });
  }

  onSelectMaze(maze: string): void {
    this.mazeService.selectMaze(maze);
    this.router.navigate(['../navigate'], { relativeTo: this.route });
  }

}

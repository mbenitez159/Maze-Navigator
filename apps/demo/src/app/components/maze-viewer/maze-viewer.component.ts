import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze-viewer',
  templateUrl: './maze-viewer.component.html',
  styleUrls: ['./maze-viewer.component.css']
})
export class MazeViewerComponent implements OnInit {

  @Input() mazeValue: string = '';
  maze: string[][] = [];

  ngOnInit(): void {
    if (this.mazeValue) {
      this.maze = this.mazeValue.trim().split('\n').map(row => row.split(''));
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze-viewer',
  templateUrl: './maze-viewer.component.html',
  styleUrls: ['./maze-viewer.component.css']
})
export class MazeViewerComponent implements OnInit {

  @Input()maze: string[][] = [];

  ngOnInit(): void {

  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze-viewer',
  templateUrl: './maze-viewer.component.html',
  styleUrls: ['./maze-viewer.component.css']
})
export class MazeViewerComponent implements OnInit {

  @Input() maze: string[][] = [];
  @Input() currentPosition: { x: number, y: number } | null = null;
  @Input() navigationMode: boolean = false;

  ngOnInit(): void {

  }

}

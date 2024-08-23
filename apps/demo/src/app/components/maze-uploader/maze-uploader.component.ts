import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';

@Component({
  selector: 'app-maze-uploader',
  templateUrl: './maze-uploader.component.html',
  styleUrls: ['./maze-uploader.component.css']
})
export class MazeUploaderComponent implements OnInit {

  constructor(private mazeService: MazeService) {}

  ngOnInit() {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.mazeService.uploadMaze(file).subscribe(
        () => alert('Maze uploaded successfully'),
        (error) => alert('Failed to upload maze: ' + error.message)
      );
    }
  }

}

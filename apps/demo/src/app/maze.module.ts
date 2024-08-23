import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeUploaderComponent } from './components/maze-uploader/maze-uploader.component';
import { MazeSelectorComponent } from './components/maze-selector/maze-selector.component';
import { MazeNavigatorComponent } from './components/maze-navigator/maze-navigator.component';
import { MazeCompletionComponent } from './components/maze-completion/maze-completion.component';
import { MazeViewerComponent } from './components/maze-viewer/maze-viewer.component';
import { MazeTransformPipe } from './pipes/maze-transform.pipe';

@NgModule({
  declarations: [
    MazeUploaderComponent,
    MazeSelectorComponent,
    MazeNavigatorComponent,
    MazeCompletionComponent,
    MazeViewerComponent,
    MazeTransformPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MazeUploaderComponent,
    MazeSelectorComponent,
    MazeNavigatorComponent,
    MazeCompletionComponent,
    MazeViewerComponent
  ]
})
export class MazeModule { }
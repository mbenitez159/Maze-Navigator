import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeUploaderComponent } from './components/maze-uploader/maze-uploader.component';
import { MazeSelectorComponent } from './components/maze-selector/maze-selector.component';
import { MazeNavigatorComponent } from './components/maze-navigator/maze-navigator.component';
import { MazeCompletionComponent } from './components/maze-completion/maze-completion.component';

@NgModule({
  declarations: [
    MazeUploaderComponent,
    MazeSelectorComponent,
    MazeNavigatorComponent,
    MazeCompletionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MazeUploaderComponent,
    MazeSelectorComponent,
    MazeNavigatorComponent,
    MazeCompletionComponent
  ]
})
export class MazeModule { }
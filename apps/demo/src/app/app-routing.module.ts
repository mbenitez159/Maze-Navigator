import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MazeUploaderComponent } from './components/maze-uploader/maze-uploader.component';
import { MazeSelectorComponent } from './components/maze-selector/maze-selector.component';
import { MazeNavigatorComponent } from './components/maze-navigator/maze-navigator.component';
import { MazeCompletionComponent } from './components/maze-completion/maze-completion.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'upload', component: MazeUploaderComponent },
  { path: 'select', component: MazeSelectorComponent },
  { path: 'navigate', component: MazeNavigatorComponent },
  { path: 'complete', component: MazeCompletionComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

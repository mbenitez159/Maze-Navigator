import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging/logging.service';
import { MazeResponse } from './models/maze-response';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public title = 'Valant demo';
  public data: string[];

  constructor(private logger: LoggingService) {}

  ngOnInit() {
  }
}

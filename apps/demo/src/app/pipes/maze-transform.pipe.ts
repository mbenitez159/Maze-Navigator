import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mazeTransform'
})
export class MazeTransformPipe implements PipeTransform {

  transform(value: string): string[][] {
    if (!value) return [];
    return value.trim().split('\n').map(row => row.split(''));
  }

}

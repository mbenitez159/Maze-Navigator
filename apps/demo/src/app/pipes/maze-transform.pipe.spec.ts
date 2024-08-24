import { MazeTransformPipe } from './maze-transform.pipe';

describe('MazeTransformPipe', () => {
  let pipe: MazeTransformPipe;

  beforeEach(() => {
    pipe = new MazeTransformPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array when input is null or undefined', () => {
    expect(pipe.transform(null)).toEqual([]);
    expect(pipe.transform(undefined)).toEqual([]);
  });

  it('should transform a single line of text into an array of characters', () => {
    const input = 'OOO';
    const expectedOutput = [['O', 'O', 'O']];
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });

  it('should transform multiple lines of text into a 2D array of characters', () => {
    const input = 'OOO\nOPO\nOOO';
    const expectedOutput = [
      ['O', 'O', 'O'],
      ['O', 'P', 'O'],
      ['O', 'O', 'O']
    ];
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });

  it('should handle empty strings correctly', () => {
    const input = '';
    const expectedOutput = [];
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });
});
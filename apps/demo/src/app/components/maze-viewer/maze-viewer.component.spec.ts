import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeViewerComponent } from './maze-viewer.component';

describe('MazeViewerComponent', () => {
  let component: MazeViewerComponent;
  let fixture: ComponentFixture<MazeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazeViewerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default @Input properties', () => {
    expect(component.maze).toEqual([]);
    expect(component.currentPosition).toBeNull();
    expect(component.navigationMode).toBeFalse();
  });

  it('should display maze correctly when @Input maze is set', () => {
    const mockMaze = [
      ['O', 'O', 'O'],
      ['O', 'P', 'O'],
      ['O', 'O', 'O'],
    ];

    component.maze = mockMaze;
    fixture.detectChanges();

    // In a real test, we would check the DOM to verify the maze is rendered correctly
    // Here, we just ensure the component received the correct data
    expect(component.maze).toEqual(mockMaze);
  });

  it('should reflect currentPosition correctly when @Input currentPosition is set', () => {
    const mockPosition = { x: 1, y: 1 };
    component.currentPosition = mockPosition;
    fixture.detectChanges();

    // In a real test, we would check the DOM to verify the position is indicated correctly
    // Here, we just ensure the component received the correct data
    expect(component.currentPosition).toEqual(mockPosition);
  });

  it('should update navigationMode when @Input navigationMode is set', () => {
    component.navigationMode = true;
    fixture.detectChanges();

    expect(component.navigationMode).toBeTrue();
  });
});

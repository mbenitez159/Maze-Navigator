using ValantDemoApi.Core.Interfaces;

namespace ValantDemoApi.Infrastructure.Services;

public class MazeValidatorService: IMazeValidatorService
{
  public bool ValidateMazeFormat(string mazeFormat)
  {
    var maze = mazeFormat.Split("\n");
    if (maze == null || maze.Length == 0)
    {
      return false;
    }

    int startCount = 0;
    int exitCount = 0;
    int rowLength = maze[0].Length;

    foreach (var row in maze)
    {
      // Check for consistent row length
      if (row.Length != rowLength)
      {
        return false;
      }

      foreach (var cell in row)
      {
        // Check for allowed characters
        if (cell != 'S' && cell != 'O' && cell != 'X' && cell != 'E')
        {
          return false;
        }

        // Count start and exit points
        if (cell == 'S')
        {
          startCount++;
        }
        else if (cell == 'E')
        {
          exitCount++;
        }
      }
    }

    // Ensure exactly one start and one exit point
    if (startCount != 1 || exitCount != 1)
    {
      return false;
    }

    return true;
  }
}

using System;
using System.Linq;
using System.Text.RegularExpressions;
using ValantDemoApi.Core.Interfaces;

namespace ValantDemoApi.Infrastructure.Services;

public class MazeValidatorService: IMazeValidatorService
{
  private static readonly Regex ValidRowPattern =
    new(@"^[SOEX][OX]+[SOEX]$", RegexOptions.Compiled);

  public bool ValidateMazeFormat(string mazeFormat)
  {
    var maze = mazeFormat.Split('\n', StringSplitOptions.RemoveEmptyEntries);

    if (!IsValidMazeStructure(maze))
      return false;

    var expectedLength = maze[0].Length;
    var startCount = 0;
    var exitCount = 0;

    foreach (var row in maze)
    {
      if (!IsValidRow(row, expectedLength))
        return false;

      startCount += row.Count(c => c == 'S');
      exitCount += row.Count(c => c == 'E');
    }

    return HasExactlyOneStartAndExit(startCount, exitCount);
  }

  private static bool IsValidMazeStructure(string[] maze) =>
    maze is { Length: >= 2 };

  private static bool IsValidRow(string row, int expectedLength) =>
    row.Length == expectedLength && ValidRowPattern.IsMatch(row);

  private static bool HasExactlyOneStartAndExit(int startCount, int exitCount) =>
    startCount == 1 && exitCount == 1;
}

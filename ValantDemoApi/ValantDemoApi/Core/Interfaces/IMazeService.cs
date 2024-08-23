using System.Collections.Generic;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.Core.Interfaces;

public interface IMazeService
{
  void SaveMaze(Maze maze);
  (IEnumerable<Maze>, int totalPages) GetMazes(int pageNumber, int pageSize);
}

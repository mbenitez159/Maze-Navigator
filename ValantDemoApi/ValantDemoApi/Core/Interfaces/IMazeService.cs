using System.Collections.Generic;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.Core.Interfaces;

public interface IMazeService
{
  void SaveMaze(Maze maze);
  Pagination<Maze> GetMazes(int pageNumber, int pageSize);
}

using System;
using System.Collections.Generic;
using System.Linq;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Core.Interfaces;
using ValantDemoApi.Infrastructure.Data;
using ValantDemoApi.Infrastructure.Repositories.Interfaces;

namespace ValantDemoApi.Infrastructure.Services;

public class MazeService(IMazeRepository mazeRepository) : IMazeService
{
  public void SaveMaze(Maze maze)
  {
    if (maze is not null)
      mazeRepository.Add(maze);
  }

  public Pagination<Maze> GetMazes(int pageNumber, int pageSize)
  {
    return mazeRepository.GetPaged(pageNumber, pageSize);
  }
}


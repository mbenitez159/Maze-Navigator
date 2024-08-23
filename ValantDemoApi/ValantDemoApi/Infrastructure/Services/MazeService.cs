using System;
using System.Collections.Generic;
using System.Linq;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Core.Interfaces;
using ValantDemoApi.Infrastructure.Data;

namespace ValantDemoApi.Infrastructure.Services;

public class MazeService : IMazeService
{
  private readonly MazeContext _context;

  public MazeService(MazeContext context)
  {
    _context = context;
  }

  public void SaveMaze(Maze maze)
  {
    _context.Mazes.Add(maze);
    _context.SaveChanges();
  }

  public (IEnumerable<Maze>, int totalPages) GetMazes(int pageNumber, int pageSize)
  {
    var totalMazes = _context.Mazes.Count();
    var totalPages = (int)Math.Ceiling((double)totalMazes / pageSize);

    var mazes = _context.Mazes
      .OrderBy(m => m.Id)
      .Skip((pageNumber - 1) * pageSize)
      .Take(pageSize)
      .ToList();

    return (mazes, totalPages);
  }
}

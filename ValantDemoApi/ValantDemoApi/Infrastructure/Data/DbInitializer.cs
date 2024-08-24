using System;
using System.Collections.Generic;
using System.Linq;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.Infrastructure.Data;

public static class DbInitializer
{
  public static void Seed(MazeContext context)
  {
    if (context.Mazes.Any())
    {
      return;   // DB has been seeded
    }

    var mazes = new List<Maze>
    {
      new Maze
      {
        Name = "Maze 1",
        Definition = "SOXXXXXXXX\nOXOOOOXXXX\nOXOXXOOOOX\nOXOXXXXXOX\nOXOOOOOXOX\nOOXXXXOXOX\nOOOOOOOXOE",
        UploadedAt = DateTime.UtcNow
      },
      new Maze
      {
        Name = "Maze 2",
        Definition = "SOXOOOOOXX\nOXOOXXXOXX\nOXOOOOXOOX\nOXXXXOXXOX\nOOOOXOOXOX\nOXXXXXOXOX\nOOOOOOOXOE",
        UploadedAt = DateTime.UtcNow
      },
      new Maze
      {
        Name = "Maze 3",
        Definition = "SOXXXXXXXX\nOXOOOOOOOX\nOXOXXXXXOX\nOXOXOOOXOX\nOXOXOXOXOX\nOXOXOXOXOX\nOOOXOOOOOE",
        UploadedAt = DateTime.UtcNow
      },
      new Maze
      {
        Name = "Maze 4",
        Definition = "SOXOOOOXXX\nOXOOXXOXXX\nOXOOOXOOOX\nOXXXOXXXOX\nOOOXOOOXOX\nOXOXXXOXOX\nOXOOOOOXOE",
        UploadedAt = DateTime.UtcNow
      },
      new Maze
      {
        Name = "Maze 5",
        Definition = "SOXXXXXXXX\nOXOOOOOOOX\nOXOXXXXXOX\nOXOXOOOXOX\nOXOXOXOXOX\nOOOOOXOOOX\nOXXXXXXXOE",
        UploadedAt = DateTime.UtcNow
      }
    };
    context.Mazes.AddRange(mazes);
    context.SaveChanges();
  }
}

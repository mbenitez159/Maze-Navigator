using System;

namespace ValantDemoApi.Core.Entities;

public class Maze
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Definition { get; set; }
  public DateTime UploadedAt { get; set; }
}

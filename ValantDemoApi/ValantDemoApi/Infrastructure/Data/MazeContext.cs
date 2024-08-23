using Microsoft.EntityFrameworkCore;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.Infrastructure.Data;

public class MazeContext(DbContextOptions<MazeContext> options) : DbContext(options)
{
  public DbSet<Maze> Mazes { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Maze>().ToTable("Mazes");
  }
}

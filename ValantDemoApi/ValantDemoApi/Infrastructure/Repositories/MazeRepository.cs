using ValantDemoApi.Core.Entities;
using ValantDemoApi.Infrastructure.Data;
using ValantDemoApi.Infrastructure.Repositories.Interfaces;

namespace ValantDemoApi.Infrastructure.Repositories;

public class MazeRepository(MazeContext context) : Repository<Maze>(context), IMazeRepository;

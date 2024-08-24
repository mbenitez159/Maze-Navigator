using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Infrastructure.Data;
using ValantDemoApi.Infrastructure.Repositories.Interfaces;

namespace ValantDemoApi.Infrastructure.Repositories;

public class Repository<T>(DbContext context) : IRepository<T>
  where T : class
{
  private readonly DbSet<T> _dbSet = context.Set<T>();

  public void Add(T entity)
  {
    _dbSet.Add(entity);
    context.SaveChanges();
  }

  public void Update(T entity)
  {
    _dbSet.Update(entity);
    context.SaveChanges();
  }

  public void Delete(T entity)
  {
    _dbSet.Remove(entity);
    context.SaveChanges();
  }

  public T GetById(int id)
  {
    return _dbSet.Find(id);
  }

  public IEnumerable<T> GetAll()
  {
    return _dbSet.ToList();
  }

  public Pagination<T> GetPaged(int pageNumber, int pageSize)
  {
    var totalItems = _dbSet.Count();
    var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

    var items = _dbSet
      .Skip((pageNumber - 1) * pageSize)
      .Take(pageSize)
      .ToList();

    return new Pagination<T>
    {
      TotalPages = totalPages,
      Items = items,
    };
  }
}

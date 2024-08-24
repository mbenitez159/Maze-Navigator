using System.Collections.Generic;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.Infrastructure.Repositories.Interfaces;

  public interface IRepository<T> where T : class
  {
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    T GetById(int id);
    IEnumerable<T> GetAll();
    Pagination<T> GetPaged(int pageNumber, int pageSize);
  }

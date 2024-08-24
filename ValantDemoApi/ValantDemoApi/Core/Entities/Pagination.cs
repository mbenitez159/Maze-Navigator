using System.Collections.Generic;

namespace ValantDemoApi.Core.Entities;

public class Pagination<T>
{
  public IEnumerable<T> Items { get; set; }
  public int TotalPages { get; set; }
}

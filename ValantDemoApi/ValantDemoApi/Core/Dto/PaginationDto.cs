using System.Collections.Generic;

namespace ValantDemoApi.Core.Dto;

public class PaginationDto<T>(IEnumerable<T> items, int totalPages)
{
  public IEnumerable<T> Items { get; set; } = items;
  public int TotalPages { get; set; } = totalPages;
}

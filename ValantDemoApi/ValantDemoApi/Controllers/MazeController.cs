using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ValantDemoApi.Core.Dto;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Core.Interfaces;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MazeController(IMazeService mazeService, IMazeValidatorService validatorService)
      : ControllerBase
    {
      [HttpPost("upload")]
        public IActionResult UploadMaze([FromBody] MazeUploadDto mazeDto)
        {
            if (!validatorService.ValidateMazeFormat(mazeDto.Definition))
            {
                return BadRequest("Invalid maze format.");
            }

            var maze = new Maze
            {
                Name = mazeDto.Name,
                Definition = mazeDto.Definition
            };

            mazeService.SaveMaze(maze);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetMazes(int pageNumber = 1, int pageSize = 10)
        {
            var page = mazeService.GetMazes(pageNumber, pageSize);
            return Ok(new PaginationDto<Maze>(page.Items, page.TotalPages));
        }
    }
}

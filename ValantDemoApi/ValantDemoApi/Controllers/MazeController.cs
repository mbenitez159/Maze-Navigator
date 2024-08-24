using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ValantDemoApi.Core.Dto;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Core.Interfaces;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly IMazeService _mazeService;
        private readonly IMazeValidatorService _validatorService;

        public MazeController(IMazeService mazeService, IMazeValidatorService validatorService)
        {
          _mazeService = mazeService;
          _validatorService = validatorService;
        }

        [HttpPost("upload")]
        public IActionResult UploadMaze([FromBody] MazeUploadDto mazeDto)
        {
            if (!_validatorService.ValidateMazeFormat(mazeDto.Definition))
            {
                return BadRequest("Invalid maze format.");
            }

            var maze = new Maze
            {
                Name = mazeDto.Name,
                Definition = mazeDto.Definition
            };

            _mazeService.SaveMaze(maze);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetMazes(int pageNumber = 1, int pageSize = 10)
        {
            var page = _mazeService.GetMazes(pageNumber, pageSize);
            return Ok(new PaginationDto<Maze>(page.Items, page.TotalPages));
        }
    }
}

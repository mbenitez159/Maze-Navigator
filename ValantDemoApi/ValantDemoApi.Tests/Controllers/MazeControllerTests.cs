using System.Collections.Generic;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using ValantDemoApi.Controllers;
using ValantDemoApi.Core.Dto;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Core.Interfaces;

namespace ValantDemoApi.Tests.Controllers;

    public class MazeControllerTests
    {
        private readonly Mock<IMazeService> _mockMazeService;
        private readonly Mock<IMazeValidatorService> _mockValidatorService;
        private readonly MazeController _controller;

        public MazeControllerTests()
        {
            _mockMazeService = new Mock<IMazeService>();
            _mockValidatorService = new Mock<IMazeValidatorService>();
            _controller = new MazeController(_mockMazeService.Object, _mockValidatorService.Object);
        }

        [Fact]
        public void UploadMaze_InvalidFormat_ShouldReturnBadRequest()
        {
            // Arrange
            var mazeDto = new MazeUploadDto { Name = "Test Maze", Definition = "Invalid Definition" };
            _mockValidatorService.Setup(v => v.ValidateMazeFormat(It.IsAny<string>())).Returns(false);

            // Act
            var result = _controller.UploadMaze(mazeDto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>()
                .Which.Value.Should().Be("Invalid maze format.");
            _mockValidatorService.Verify(v => v.ValidateMazeFormat(mazeDto.Definition), Times.Once);
            _mockMazeService.Verify(m => m.SaveMaze(It.IsAny<Maze>()), Times.Never);
        }

        [Fact]
        public void UploadMaze_ValidFormat_ShouldReturnOk()
        {
            // Arrange
            var mazeDto = new MazeUploadDto { Name = "Test Maze", Definition = "Valid Definition" };
            _mockValidatorService.Setup(v => v.ValidateMazeFormat(It.IsAny<string>())).Returns(true);

            // Act
            var result = _controller.UploadMaze(mazeDto);

            // Assert
            result.Should().BeOfType<OkResult>();
            _mockValidatorService.Verify(v => v.ValidateMazeFormat(mazeDto.Definition), Times.Once);
            _mockMazeService.Verify(m => m.SaveMaze(It.Is<Maze>(m => m.Name == mazeDto.Name && m.Definition == mazeDto.Definition)), Times.Once);
        }

        [Fact]
        public void GetMazes_ShouldReturnOkWithPaginationDto()
        {
            // Arrange
            var mazeList = new List<Maze>
            {
                new Maze { Name = "Maze 1", Definition = "MazeDefinition1" },
                new Maze { Name = "Maze 2", Definition = "MazeDefinition2" }
            };
            int pageNumber = 1, pageSize = 10, totalPages = 1;

            var pagination = new Pagination<Maze>
            {
                Items = mazeList,
                TotalPages = totalPages
            };

            _mockMazeService.Setup(m => m.GetMazes(pageNumber, pageSize)).Returns(pagination);

            // Act
            var result = _controller.GetMazes(pageNumber, pageSize);

            // Assert
            var okResult = result.Should().BeOfType<OkObjectResult>().Which;
            var resultValue = okResult.Value.Should().BeOfType<PaginationDto<Maze>>().Which;
            resultValue.Items.Should().BeEquivalentTo(mazeList);
            resultValue.TotalPages.Should().Be(totalPages);

            _mockMazeService.Verify(m => m.GetMazes(pageNumber, pageSize), Times.Once);
        }

        [Fact]
        public void GetMazes_DefaultParameters_ShouldReturnOkWithPaginationDto()
        {
            // Arrange
            var mazeList = new List<Maze>
            {
                new Maze { Name = "Maze 1", Definition = "MazeDefinition1" },
                new Maze { Name = "Maze 2", Definition = "MazeDefinition2" }
            };
            int defaultPageNumber = 1, defaultPageSize = 10, totalPages = 1;

            var pagination = new Pagination<Maze>
            {
                Items = mazeList,
                TotalPages = totalPages
            };

            _mockMazeService.Setup(m => m.GetMazes(defaultPageNumber, defaultPageSize)).Returns(pagination);

            // Act
            var result = _controller.GetMazes();

            // Assert
            var okResult = result.Should().BeOfType<OkObjectResult>().Which;
            var resultValue = okResult.Value.Should().BeOfType<PaginationDto<Maze>>().Which;
            resultValue.Items.Should().BeEquivalentTo(mazeList);
            resultValue.TotalPages.Should().Be(totalPages);

            _mockMazeService.Verify(m => m.GetMazes(defaultPageNumber, defaultPageSize), Times.Once);
        }
    }


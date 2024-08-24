using System.Collections.Generic;
using FluentAssertions;
using Moq;
using ValantDemoApi.Core.Entities;
using ValantDemoApi.Infrastructure.Data;
using ValantDemoApi.Infrastructure.Repositories.Interfaces;
using ValantDemoApi.Infrastructure.Services;
using Xunit;

namespace ValantDemoApi.Tests.Services
{
    public class MazeServiceTests
    {
        private readonly Mock<IMazeRepository> _mockRepository;
        private readonly MazeService _mazeService;

        protected MazeServiceTests()
        {
            _mockRepository = new Mock<IMazeRepository>();
            _mazeService = new MazeService(_mockRepository.Object);
        }

        public class SaveMazeMethod : MazeServiceTests
        {
            [Fact]
            public void Should_Call_Repository_Add_Method_With_Provided_Maze()
            {
                // Arrange
                var maze = new Maze { Id = 1, Definition = "SOXXE" };

                // Act
                _mazeService.SaveMaze(maze);

                // Assert
                _mockRepository.Verify(r => r.Add(maze), Times.Once);
            }

            [Fact]
            public void Should_Not_Throw_Exception_When_Saving_Valid_Maze()
            {
                // Arrange
                var maze = new Maze { Id = 1, Definition = "SOXXE" };

                // Act & Assert
                _mazeService.Invoking(s => s.SaveMaze(maze))
                    .Should().NotThrow();
            }

            [Fact]
            public void Should_Handle_Null_Maze_Gracefully()
            {
              // Arrange
              Maze maze = null;

              // Act
              _mazeService.SaveMaze(maze);

              // Assert
              _mockRepository.Verify(r => r.Add(It.IsAny<Maze>()), Times.Never);
            }
        }

        public class GetMazesMethod : MazeServiceTests
        {
            [Theory]
            [InlineData(1, 10)]
            [InlineData(2, 5)]
            [InlineData(3, 20)]
            public void Should_Return_Pagination_Result_From_Repository(int pageNumber, int pageSize)
            {
                // Arrange
                var expectedPagination = new Pagination<Maze>
                {
                    Items = new List<Maze> { new() { Id = 1, Definition = "SOXXE" } },
                    TotalPages = 1
                };

                _mockRepository.Setup(r => r.GetPaged(pageNumber, pageSize))
                    .Returns(expectedPagination);

                // Act
                var result = _mazeService.GetMazes(pageNumber, pageSize);

                // Assert
                result.Should().BeEquivalentTo(expectedPagination);
                _mockRepository.Verify(r => r.GetPaged(pageNumber, pageSize), Times.Once);
            }

            [Fact]
            public void Should_Handle_Empty_Result_From_Repository()
            {
                // Arrange
                var emptyPagination = new Pagination<Maze>
                {
                    Items = new List<Maze>(),
                    TotalPages = 0
                };

                _mockRepository.Setup(r => r.GetPaged(1, 10))
                    .Returns(emptyPagination);

                // Act
                var result = _mazeService.GetMazes(1, 10);

                // Assert
                result.Should().BeEquivalentTo(emptyPagination);
                result.Items.Should().BeEmpty();
                result.TotalPages.Should().Be(0);
            }

            [Theory]
            [InlineData(0, 10)]
            [InlineData(1, 0)]
            [InlineData(-1, 5)]
            [InlineData(1, -5)]
            public void Should_Handle_Invalid_Pagination_Parameters(int pageNumber, int pageSize)
            {
                // Arrange
                var emptyPagination = new Pagination<Maze>
                {
                    Items = new List<Maze>(),
                    TotalPages = 0
                };

                _mockRepository.Setup(r => r.GetPaged(It.IsAny<int>(), It.IsAny<int>()))
                    .Returns(emptyPagination);

                // Act
                var result = _mazeService.GetMazes(pageNumber, pageSize);

                // Assert
                result.Should().NotBeNull();
                result.Items.Should().BeEmpty();
                result.TotalPages.Should().Be(0);
                _mockRepository.Verify(r => r.GetPaged(pageNumber, pageSize), Times.Once);
            }

            [Fact]
            public void Should_Return_Correct_TotalPages()
            {
                // Arrange
                var expectedPagination = new Pagination<Maze>
                {
                    Items = new List<Maze> { new() { Id = 1, Definition = "SOXXE" } },
                    TotalPages = 3
                };

                _mockRepository.Setup(r => r.GetPaged(1, 10))
                    .Returns(expectedPagination);

                // Act
                var result = _mazeService.GetMazes(1, 10);

                // Assert
                result.TotalPages.Should().Be(3);
            }
        }
    }
}

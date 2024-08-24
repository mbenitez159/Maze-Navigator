using FluentAssertions;
using ValantDemoApi.Infrastructure.Services;
using Xunit;

namespace ValantDemoApi.Tests.Services
{
    public class MazeValidatorServiceTests
    {
        private readonly MazeValidatorService _mazeValidatorService = new();

        [Fact]
        public void ValidateMazeFormat_ShouldReturnTrue_ForValidMaze()
        {
            // Arrange
            var validMaze = "SOXX\nOXOX\nOXOX\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(validMaze);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForEmptyMaze()
        {
            // Arrange
            var emptyMaze = "";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(emptyMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForSingleRowMaze()
        {
            // Arrange
            var singleRowMaze = "SOXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(singleRowMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithInconsistentRowLengths()
        {
            // Arrange
            var inconsistentMaze = "SOXX\nOXOX\nOXO\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(inconsistentMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithInvalidCharacters()
        {
            // Arrange
            var invalidCharMaze = "SOXX\nOXOX\nOXAX\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(invalidCharMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithMultipleStarts()
        {
            // Arrange
            var multipleStartsMaze = "SOXX\nOXOX\nSXOX\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(multipleStartsMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithMultipleExits()
        {
            // Arrange
            var multipleExitsMaze = "SOXX\nOXOX\nEXOX\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(multipleExitsMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithNoStart()
        {
            // Arrange
            var noStartMaze = "OXXX\nOXOX\nOXOX\nXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(noStartMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithNoExit()
        {
            // Arrange
            var noExitMaze = "SOXX\nOXOX\nOXOX\nXXXX";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(noExitMaze);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void ValidateMazeFormat_ShouldReturnFalse_ForMazeWithInvalidRowPattern()
        {
            // Arrange
            var invalidRowPatternMaze = "SOXXX\nOXSXO\nOXOXO\nXXXXE";

            // Act
            var result = _mazeValidatorService.ValidateMazeFormat(invalidRowPatternMaze);

            // Assert
            result.Should().BeFalse();
        }
    }
}

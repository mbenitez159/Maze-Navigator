
using System.Net;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using ValantDemoApi.Core.Dto;
using ValantDemoApi.Core.Entities;

namespace ValantDemoApi.IntegrationTests.Endpoints
{
     public class MazeControllerIntegrationTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public MazeControllerIntegrationTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task UploadMaze_ShouldReturnOk_WhenMazeIsValid()
        {
            // Arrange
            var mazeDto = new MazeUploadDto
            {
                Name = "Test Maze",
                Definition = "SOXXXXXXXX\nOXOOOOXXXX\nOXOXXOOOOX\nOXOXXXXXOX\nOXOOOOOXOX\nOOXXXXOXOX\nOOOOOOOXOE"
            };

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            var content = new StringContent(
                JsonSerializer.Serialize(mazeDto, jsonOptions),
                System.Text.Encoding.UTF8,
                "application/json");

            // Act
            var response = await _client.PostAsync("/api/maze/upload", content);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task UploadMaze_ShouldReturnBadRequest_WhenMazeIsInvalid()
        {
            // Arrange
            var mazeDto = new MazeUploadDto
            {
                Name = "Invalid Maze",
                Definition = "SOXXXXXXXX\nOXOOOOXXXX\nOXOXXOOOOX\nOXOXXXXXOX\nOXOOOOOXOX\nOOXXXXOXOX\nOOOOOOOXOX" // No exit
            };

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            var content = new StringContent(
                JsonSerializer.Serialize(mazeDto, jsonOptions),
                System.Text.Encoding.UTF8,
                "application/json");

            // Act
            var response = await _client.PostAsync("/api/maze/upload", content);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task GetMazes_ShouldReturnPaginatedResult()
        {
            // Arrange
            // First, upload a maze to ensure there's data
            var mazeDto = new MazeUploadDto
            {
                Name = "Test Maze",
                Definition = "SOXXXXXXXX\nOXOOOOXXXX\nOXOXXOOOOX\nOXOXXXXXOX\nOXOOOOOXOX\nOOXXXXOXOX\nOOOOOOOXOE"
            };

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            var content = new StringContent(
                JsonSerializer.Serialize(mazeDto, jsonOptions),
                System.Text.Encoding.UTF8,
                "application/json");

            await _client.PostAsync("/api/maze/upload", content);

            // Act
            var response = await _client.GetAsync("/api/maze?pageNumber=1&pageSize=10");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<PaginationDto<Maze>>(responseContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            result.Should().NotBeNull();
            result.Items.Should().NotBeEmpty();
            result.TotalPages.Should().BeGreaterThan(0);
        }
    }

    public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            // Customize the configuration here if needed
            return base.CreateHost(builder);
        }
    }
}

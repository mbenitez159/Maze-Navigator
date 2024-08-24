using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ValantDemoApi.Core.Interfaces;
using ValantDemoApi.Infrastructure.Data;
using ValantDemoApi.Infrastructure.Repositories;
using ValantDemoApi.Infrastructure.Repositories.Interfaces;
using ValantDemoApi.Infrastructure.Services;

namespace ValantDemoApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();
      services.AddControllers();
      services.AddDbContext<MazeContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
      services.AddScoped<IMazeRepository, MazeRepository>();
      services.AddScoped<IMazeService, MazeService>();
      services.AddScoped<IMazeValidatorService, MazeValidatorService>();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ValantDemoApi", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, MazeContext context)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
          c.SwaggerEndpoint("/swagger/v1/swagger.json", "ValantDemoApi v1");
        });
      }

      // Ensure the database is created
      context.Database.EnsureCreated();  // <-- Add this line

      // Apply any pending migrations
      context.Database.Migrate();  // <-- Or add this line to apply migrations

      // Seed the database if needed
      DbInitializer.Seed(context);

      app.UseRouting();
      app.UseCors(x => x
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

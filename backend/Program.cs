using HotelBookingApi.Data;
using Microsoft.EntityFrameworkCore;
using HotelBookingApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(
options =>
options.UseSqlServer(
builder.Configuration.GetConnectionString(
"DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseMiddleware<
ExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
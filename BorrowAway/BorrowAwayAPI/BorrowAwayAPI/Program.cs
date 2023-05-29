using BorrowAwayAPI.Context;
using BorrowAwayAPI.Services;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BorrowAwayAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                                              .AddJwtBearer(options =>
                                              {
                                                  options.TokenValidationParameters = new TokenValidationParameters
                                                  {
                                                      ClockSkew= TimeSpan.FromSeconds(5),
                                                      ValidateIssuerSigningKey = true,
                                                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                                                        .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
                                                      ValidateIssuer = false,
                                                      ValidateAudience = false,
                                                      ValidateLifetime = true
                                                  };
                                              });


            builder.Services.AddDbContext<BorrowAwayDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("BAConnectionString"));
            });
            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IValidationService,ValidationService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(x =>
            x.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowCredentials());
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
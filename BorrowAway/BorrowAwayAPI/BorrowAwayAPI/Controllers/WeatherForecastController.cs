using BorrowAwayAPI.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly BAConfiguration _config;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IOptions<BAConfiguration> config)
        {
            _logger = logger;
            _config = config.Value;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public string Get()
        {
            return _config.BorrowAwayConnectionString;           
        }
    }
}
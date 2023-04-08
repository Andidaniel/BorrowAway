using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterUserDTO userToRegister)
        {
            try
            {
                await _authService.RegisterUser(userToRegister);
            }
        }
    }
}

using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
                var createdUser = await _authService.RegisterUser(userToRegister);
                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserDTO userToLogin)
        {
            try
            {
                string token = await _authService.LoginUser(userToLogin);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Test")]
        [Authorize(Roles ="Admin")]
        public ActionResult<string> Test()
        {

            return Ok("\"Works\"");
        }


    }
}

using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IValidationService _validationService;
        
        public AuthController(IAuthService authService, IValidationService validationService, IAnnouncementService announcementService)
        {
            _authService = authService;
            _validationService = validationService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterUserDTO userToRegister)
        {
            try
            {
                AppUser createdUser = await _authService.RegisterUser(userToRegister);
                return Ok("User created");
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
        
        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            string token = HttpContext.Request.Headers["Authorization"].ToString();
            if (token != null)
            {
                try
                {
                    await _validationService.ValidateRequest(token);
                }
                catch (Exception)
                {
                    return Ok();
                }
                bool loggedOut = await _authService.LogoutUser(token);
                if(loggedOut == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return new StatusCodeResult(StatusCodes.Status401Unauthorized);
        }



    }
}

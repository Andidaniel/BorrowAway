using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BorrowAwayAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        private readonly IAuthService _authService;

        public RequestController(IRequestService requestService, IAuthService authService)
        {
            _requestService = requestService;
            _authService = authService;
        }

        [Authorize]
        [HttpPost("PostRequest")]
        public async Task<ActionResult<string>> PostRequest([FromBody] BorrowRequestDTO requestDTO) {
            string userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)!.Value;
            Guid userId = await _authService.GetUserIdByEmail(userEmail);
            bool createRequestResult = await _requestService.AddRequest(requestDTO, userId);
            if (createRequestResult == true)
            {
                return Ok("Created");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [Authorize]
        [HttpGet("GetBusyDaysForAnnouncement/{announcementId}")]
        public async Task<ActionResult<List<DateTime>>> GetBusyDaysForAnnouncement(int announcementId)
        {
            var result = await _requestService.GetDisabledDatesForAnnouncement(announcementId);
            return Ok(result);
        }
    }
}

using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IAnnouncementService _announcementService;

        public RequestController(IRequestService requestService, IAuthService authService, IAnnouncementService announcementService)
        {
            _requestService = requestService;
            _authService = authService;
            _announcementService = announcementService;
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
            List<DateTime> result = await _requestService.GetDisabledDatesForAnnouncement(announcementId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetRequestsForUser")]
        public async Task<ActionResult<List<RequestViewDTO>>> GetAllRequestsForLoggedInUser()
        {
            string userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)!.Value;
            Guid userId = await _authService.GetUserIdByEmail(userEmail);
            List<RequestViewDTO> requestsResult = await _requestService.GetAllRequestsForLoggedInUser(userId);

            return Ok(requestsResult);
        }

        [Authorize]
        [HttpGet("GetRequestsMadeByUser")]
        public async Task<ActionResult<List<RequestViewDTO>>> GetAllRequestsMadeByLoggedInUser()
        {
            string userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)!.Value;
            Guid userId = await _authService.GetUserIdByEmail(userEmail);
            List<RequestViewDTO> requestsResult = await _requestService.GetAllRequestsMadeByLoggedInUser(userId);

            return Ok(requestsResult);
        }

        [Authorize]
        [HttpPut("ApproveRequest/{id}")]
        public async Task<ActionResult<string>> ApproveRequest(int id)
        {
            var approveResult = await _requestService.DenyRequest(id);
            if (approveResult == true)
            {
                return Ok("Approved");
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error");
        }

        [Authorize]
        [HttpPut("DenyRequest/{id}")]
        public async Task<ActionResult<string>> DenyRequest(int id)
        {
            var denyResult = await _requestService.DenyRequest(id);
            if (denyResult == true)
            {
                return Ok("Denied");
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error");
        }

    }
}

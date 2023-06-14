using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;
        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [Authorize]
        [HttpPost("Add")]
        public async Task<ActionResult<string>> Test([FromBody] AnnouncementDTO announcementToAdd)
        {

            var userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
            bool result = await _announcementService.AddAnnouncementAsync(announcementToAdd, userEmail);
            if (result == true)
            {
                return Ok("Announcement Created Successfully");
            }

            return BadRequest("ERROR_SAVING_ANNOUNCEMENT");
        }
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAll()
         {
            return Ok(await _announcementService.GetAllAnnouncementsAsync());
        }
    }
}

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
        public async Task<ActionResult<string>> AddAnnouncement([FromBody] AnnouncementDTO announcementToAdd)
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
        [HttpGet("GetLast/{n}")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetLastNAnnouncements(int n)
        {
            return Ok(await _announcementService.GetLastNAnnouncementsAsync(n));
        }
        [Authorize]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<AnnouncementDTO>> GetAnnouncementById(int id)
        {
            AnnouncementDTO announcementToReturn = await _announcementService.GetAnnouncementById(id);
            if (announcementToReturn != null)
            {
                return Ok(announcementToReturn);
            }
            return NotFound();
        }


    }
}

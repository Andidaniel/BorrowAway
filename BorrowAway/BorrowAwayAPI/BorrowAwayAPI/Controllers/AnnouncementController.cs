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

        [Authorize]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAllAnnouncements()
        {
            return Ok(await _announcementService.GetAllAnnouncementsAsync());
        }

        [Authorize]
        [HttpGet("GetUserName/{id}")]
        public async Task<ActionResult<string>> GetUserNameById(Guid id)
        {
            string name = await _announcementService.GetPosterNameById(id);
            return Ok(name);
        }

        [Authorize]
        [HttpGet("GetAllByUserId/{id}")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAnnouncementsByUserId(Guid id)
        {
            List<AnnouncementDTO> announcements = await _announcementService.GetAllAnnouncementsByUserIdAsync(id);
            if (announcements.Count != 0)
            {
                return Ok(announcements);
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("GetAllByCategoryId/{id}")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAnnouncementsByCategory(int id)
        {
            List<AnnouncementDTO> announcements = await _announcementService.GetAllAnnouncementsByCategory(id);
            return Ok(announcements);
        }

        [Authorize]
        [HttpPost("SearchAnnouncements")]
        public async Task<ActionResult<List<AnnouncementDTO>>> SearchAnnouncementsByString([FromBody] string searchText){
            List<AnnouncementDTO> result =await _announcementService.GetAllAnnouncementsBySearchText(searchText);
            if (result.Count != 0)
            {
                return Ok(result);
            }
            return NotFound();
        }



}
}

﻿using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IO;
using System;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;
        private readonly IAuthService _authService;

        public AnnouncementController(IAnnouncementService announcementService, IAuthService authService)
        {
            _announcementService = announcementService;
            _authService = authService;
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
        [HttpGet("GetAllByUserEmail")]
        public async Task<ActionResult<List<AnnouncementDTO>>> GetAnnouncementsByUserEmail()
        {
            string userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)!.Value;
            Guid userId = await _authService.GetUserIdByEmail(userEmail);

            List<AnnouncementDTO> announcements = await _announcementService.GetAllAnnouncementsByUserIdAsync(userId);
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
        [HttpGet("SearchAnnouncements")]
        public async Task<ActionResult<List<AnnouncementDTO>>> SearchAnnouncementsByString([FromQuery] string searchText)
        {
            var slash = Path.DirectorySeparatorChar;
            Console.WriteLine(slash);
            List<AnnouncementDTO> result = await _announcementService.GetAllAnnouncementsBySearchText(searchText);
            if (result.Count != 0)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [Authorize]
        [HttpPut("UpdateAnnouncement")]
        public async Task<ActionResult<string>> UpdateAnnouncement([FromBody] AnnouncementDTO announcementDTO)
        {
            
            var userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
            var userId = await _authService.GetUserIdByEmail(userEmail);

            if (userId != announcementDTO.UserId)
            {
                return Unauthorized();
            }



            bool result = await _announcementService.UpdateAnnouncement(announcementDTO, userEmail);
            if (result == true)
            {
                return Ok("Updated");
            }
            return NotFound("Not Found");
        }

        [Authorize]
        [HttpDelete("DeleteAnnouncement/{id}")]
        public async Task<ActionResult<string>> DeleteAnnouncemnet(int id)
        {
            bool result = await _announcementService.DeleteAnnouncementAsync(id);
            if(result == true)
            {
                return Ok("Deleted");
            }
            return NotFound("Not Found");
        }



    }
}

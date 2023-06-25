using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BorrowAwayAPI.Services
{
    public class RequestService : IRequestService
    {
        private readonly BorrowAwayDbContext _dbContext;
        public RequestService(BorrowAwayDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddRequest(BorrowRequestDTO requestDTO, Guid userId)
        {
            BorrowRequest requestToCreate = new BorrowRequest();
            requestToCreate.Id = 0;
            requestToCreate.UserId = userId;
            requestToCreate.StartDate = requestDTO.StartDate;
            requestToCreate.EndDate = requestDTO.EndDate;
            requestToCreate.Status = "Pending";

            Announcement? announcement = _dbContext.Announcements.FirstOrDefault(a => a.Id == requestDTO.AnnouncementId);

            if (announcement != null)
            {
                requestToCreate.AnnouncementId = requestDTO.AnnouncementId;
            }
            else
            {
                return false;
            }

            _dbContext.BorrowRequests.Add(requestToCreate);
            return await _dbContext.SaveChangesAsync() > 0;

        }

        public async Task<List<DateTime>> GetDisabledDatesForAnnouncement(int announcementId)
        {
            Announcement? result = await _dbContext.Announcements.Include(a => a.BorrowRequests).FirstOrDefaultAsync(a => a.Id == announcementId);
            List<DateTime> daysInRange = new List<DateTime>();

            foreach (var request in result.BorrowRequests)
            {
                if(request.Status == "Approved")
                {
                    DateTime currentDate = request.StartDate;

                    while (currentDate <= request.EndDate)
                    {
                        daysInRange.Add(currentDate);
                        currentDate = currentDate.AddDays(1);
                    }
                }
               
            }

            return daysInRange;
        }
    }
}

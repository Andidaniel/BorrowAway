using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;

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
    }
}

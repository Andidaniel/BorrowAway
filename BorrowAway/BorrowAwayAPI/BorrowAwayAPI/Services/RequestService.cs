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

        public async Task<bool> ApproveRequest(int requestId)
        {
            var request = _dbContext.BorrowRequests.FirstOrDefault(r => r.Id == requestId);
            request!.Status = "Approved";
            _dbContext.Update(request);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteRequest(int requestId)
        {
            BorrowRequest requestToDelete = await _dbContext.BorrowRequests.FirstOrDefaultAsync(r => r.Id == requestId);
            _dbContext.BorrowRequests.Remove(requestToDelete);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DenyRequest(int requestId)
        {
            var request = _dbContext.BorrowRequests.FirstOrDefault(r => r.Id == requestId);
            request!.Status = "Denied";
            _dbContext.Update(request);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<List<RequestViewDTO>> GetAllRequestsForLoggedInUser(Guid userId)
        {
            List<Announcement> announcementsCreatedByUser = await _dbContext.Announcements.Where(a => a.UserId.Equals(userId)).Include(a => a.BorrowRequests).ToListAsync();
            List<RequestViewDTO> requests = new List<RequestViewDTO>();
            foreach (var announcement in announcementsCreatedByUser)
            {
                if (announcement.BorrowRequests.Count != 0)
                {
                    foreach (BorrowRequest request in announcement.BorrowRequests)
                    {
                        RequestViewDTO requestToAdd = new RequestViewDTO();
                        requestToAdd.AnnouncementTitle = announcement.Title;
                        requestToAdd.Status = request.Status;
                        requestToAdd.Id = request.Id;
                        requestToAdd.StartDate = request.StartDate;
                        requestToAdd.EndDate = request.EndDate;
                        requestToAdd.Requester = (await _dbContext.Users.FirstOrDefaultAsync(u => u.Id.Equals(request.UserId)))!.FirstName;
                        requests.Add(requestToAdd);
                    }

                }
            }

            return requests;
        }

        public async Task<List<RequestViewDTO>> GetAllRequestsMadeByLoggedInUser(Guid userId)
        {
            List<BorrowRequest> requests = await _dbContext.BorrowRequests
                .Where(r => r.UserId.Equals(userId))
                .Include(r => r.User)
                .Include(r => r.Announcement)
                .ThenInclude(a => a.User)
                .ToListAsync();

            List<RequestViewDTO> requestsToReturn = new List<RequestViewDTO>();
            foreach (var request in requests)
            {
                RequestViewDTO requestToAdd = new RequestViewDTO();
                requestToAdd.Id = request.Id;
                requestToAdd.StartDate = request.StartDate;
                requestToAdd.Status = request.Status;
                requestToAdd.EndDate = request.EndDate;
                requestToAdd.AnnouncementTitle = request.Announcement.Title;
                requestToAdd.Requester = request.User.FirstName;
                requestToAdd.Borrower = request.Announcement.User.FirstName;

                requestsToReturn.Add(requestToAdd);
            }
            return requestsToReturn;
        }

        public async Task<List<DateTime>> GetDisabledDatesForAnnouncement(int announcementId)
        {
            Announcement? result = await _dbContext.Announcements.Include(a => a.BorrowRequests).FirstOrDefaultAsync(a => a.Id == announcementId);
            List<DateTime> daysInRange = new List<DateTime>();

            foreach (var request in result.BorrowRequests)
            {
                if (request.Status == "Approved")
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

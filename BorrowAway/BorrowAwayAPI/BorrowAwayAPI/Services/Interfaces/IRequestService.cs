using BorrowAwayAPI.DTOs;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IRequestService
    {
        Task<bool> AddRequest(BorrowRequestDTO requestDTO, Guid userId);
        Task<List<DateTime>> GetDisabledDatesForAnnouncement(int announcementId);
        Task<List<RequestViewDTO>> GetAllRequestsForLoggedInUser(Guid userId);
        Task<List<RequestViewDTO>> GetAllRequestsMadeByLoggedInUser(Guid userId);
        Task<bool> ApproveRequest(int requestId);
        Task<bool> DenyRequest(int requestId);
    }
}

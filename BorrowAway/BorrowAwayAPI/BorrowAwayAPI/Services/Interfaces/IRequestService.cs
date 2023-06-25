using BorrowAwayAPI.DTOs;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IRequestService
    {
        Task<bool> AddRequest(BorrowRequestDTO requestDTO, Guid userId);
        Task<List<DateTime>> GetDisabledDatesForAnnouncement(int announcementId);

    }
}

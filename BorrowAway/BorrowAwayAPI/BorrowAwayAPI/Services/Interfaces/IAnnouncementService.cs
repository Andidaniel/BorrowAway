using BorrowAwayAPI.DTOs;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementToAdd,string userEmail);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsAsync();
    }
}

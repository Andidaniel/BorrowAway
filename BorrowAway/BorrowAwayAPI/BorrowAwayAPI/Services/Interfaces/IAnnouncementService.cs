using BorrowAwayAPI.DTOs;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementToAdd,string userEmail);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsAsync();
        Task<List<AnnouncementDTO>> GetLastNAnnouncementsAsync(int n);
        Task<AnnouncementDTO> GetAnnouncementById(int id);
        Task<string> GetPosterNameById(Guid userId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsByUserIdAsync(Guid userId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsByCategory(int categoryId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsBySearchText(string searchText);
    }
}

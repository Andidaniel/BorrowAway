using BorrowAwayAPI.DTOs;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementToAdd,string userEmail);
        Task<List<AnnouncementDTO>> GetLastNAnnouncementsAsync(int n);
        Task<string> GetPosterNameById(Guid userId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsAsync();
        Task<List<AnnouncementDTO>> GetAllAnnouncementsByUserIdAsync(Guid userId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsByCategory(int categoryId);
        Task<List<AnnouncementDTO>> GetAllAnnouncementsBySearchText(string searchText);
        Task<AnnouncementDTO> GetAnnouncementById(int id);
        Task<bool> UpdateAnnouncement(AnnouncementDTO announcementDTO);
        Task<bool> DeleteAnnouncementAsync(int id);
    }
}

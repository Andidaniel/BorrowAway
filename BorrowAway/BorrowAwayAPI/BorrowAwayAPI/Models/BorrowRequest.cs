using BorrowAwayAPI.Models.BorrowAwayAPI.Models;

namespace BorrowAwayAPI.Models
{
    public class BorrowRequest
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? UserId { get; set; }
        public string Status { get; set; }

        public AppUser User { get; set; }
        public Announcement Announcement { get; set; }
    }
}

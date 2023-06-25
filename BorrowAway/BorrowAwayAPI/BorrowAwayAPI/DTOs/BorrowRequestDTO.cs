namespace BorrowAwayAPI.DTOs
{
    public class BorrowRequestDTO
    {
        public int AnnouncementId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

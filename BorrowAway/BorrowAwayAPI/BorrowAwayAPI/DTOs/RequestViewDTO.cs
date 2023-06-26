namespace BorrowAwayAPI.DTOs
{
    public class RequestViewDTO
    {
        public int Id { get; set; }
        public string? AnnouncementTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Requester { get; set; }
        public string? Borrower { get; set; }
        public string? Status { get; set; }
    }
}

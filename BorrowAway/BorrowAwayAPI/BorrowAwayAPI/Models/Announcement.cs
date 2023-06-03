namespace BorrowAwayAPI.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfImages { get; set; }
        public string ImagesDirectoryPath { get; set; }

        public AppUser User { get; set; }
    }
}

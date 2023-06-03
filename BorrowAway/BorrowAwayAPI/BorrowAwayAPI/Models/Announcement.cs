namespace BorrowAwayAPI.Models
{
    namespace BorrowAwayAPI.Models
    {
        public class Announcement
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int NumberOfImages { get; set; }
            public float PricePerDay { get; set; }
            public DateTime CreationDate { get; set; }
            public string ContactMethod { get; set; }
            public string Location { get; set; }
            public string ImagesDirectoryPath { get; set; }
            public Guid UserId { get; set; }
            public int CategoryId { get; set; }

            public AppUser User { get; set; }
            public Category Category { get; set; }
        }
    }

}

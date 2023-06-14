using System.Text.Json.Serialization;

namespace BorrowAwayAPI.DTOs
{
    public class AnnouncementDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfImages { get; set; }
        public float PricePerDay { get; set; }
        public DateTime CreationDate { get; set; }
        public string ContactMethod { get; set; }
        public string  Location { get; set; }
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
        public List<string> ImagesData{ get; set; }
    }
}

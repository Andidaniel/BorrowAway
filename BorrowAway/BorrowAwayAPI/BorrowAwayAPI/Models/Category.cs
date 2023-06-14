using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using System.Text.Json.Serialization;

namespace BorrowAwayAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [JsonIgnore]
        public virtual ICollection<Announcement> Annnouncements { get; set; }
    }
}

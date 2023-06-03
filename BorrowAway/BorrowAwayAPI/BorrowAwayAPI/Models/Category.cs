using BorrowAwayAPI.Models.BorrowAwayAPI.Models;

namespace BorrowAwayAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Announcement> Annnouncements { get; set; }
    }
}

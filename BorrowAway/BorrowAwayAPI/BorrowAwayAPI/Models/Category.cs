namespace BorrowAwayAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Announcement> Announcements { get; set; }
    }
}

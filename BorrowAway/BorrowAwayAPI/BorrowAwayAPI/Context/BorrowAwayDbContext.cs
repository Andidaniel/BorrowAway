using BorrowAwayAPI.Models;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BorrowAwayAPI.Context
{
    public class BorrowAwayDbContext : DbContext
    {

        public BorrowAwayDbContext() : base()
        {
        }
        
        public BorrowAwayDbContext(DbContextOptions<BorrowAwayDbContext> options) : base(options) 
        { 
        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AppUser>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<TokenBlackList> InvalidTokens { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Category> Categories { get; set; }


    }
}

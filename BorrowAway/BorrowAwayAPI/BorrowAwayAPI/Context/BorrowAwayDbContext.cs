using BorrowAwayAPI.Models;
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
        
        public DbSet<AppUser> Users { get; set; }


    }
}

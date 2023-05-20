using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace BorrowAwayAPI.Models
{
    public class AppUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }


    }
}

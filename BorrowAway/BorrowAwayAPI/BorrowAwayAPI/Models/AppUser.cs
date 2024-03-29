﻿using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
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

        public virtual ICollection<Announcement> Announcements { get; set; }
        public virtual ICollection<BorrowRequest> BorrowRequests { get; set; }

    }
}

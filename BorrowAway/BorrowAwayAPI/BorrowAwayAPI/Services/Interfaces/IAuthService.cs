using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AppUser> RegisterUser(RegisterUserDTO userToRegister);
    }
}

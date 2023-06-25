using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AppUser> RegisterUser(RegisterUserDTO userToRegister);
        Task<string> LoginUser(LoginUserDTO userToLogin);
        Task<bool> LogoutUser(string token);
        Task<Guid> GetUserIdByEmail(string email);
    }
}

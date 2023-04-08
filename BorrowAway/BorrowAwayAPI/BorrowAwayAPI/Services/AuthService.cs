using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace BorrowAwayAPI.Services
{
    public class AuthService:IAuthService
    {
        private readonly BorrowAwayDbContext _dbContext;
        public AuthService(BorrowAwayDbContext context)
        {
            _dbContext = context;
        }

        public async Task<AppUser> RegisterUser(RegisterUserDTO userToRegister) {

                AppUser userTest = new AppUser();
                CreatePasswordHash(userToRegister.Password, out byte[] passwordHash, out byte[] passwordSalt);
                ValidateUserDTO(userToRegister);

                userTest.FirstName = userToRegister.FirstName;
                userTest.LastName = userToRegister.LastName;
                userTest.Email = userToRegister.Email;
                userTest.PasswordHash = passwordHash;
                userTest.PasswordSalt = passwordSalt;

                await _dbContext.Users.AddAsync(userTest);
                await _dbContext.SaveChangesAsync();

                return userTest;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) { 
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private void ValidateUserDTO(RegisterUserDTO userDTO) { 
            ValidateEmail(userDTO.Email);
            ValidateFirstName(userDTO.FirstName);
            ValidateLastName(userDTO.LastName);
        }

        private void ValidateFirstName(string firstName)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new ArgumentNullException("FNAME_EMPTY");
            }
            if (firstName.Any(char.IsDigit)){
                throw new ArgumentException("FNAME_CANNOT_CONTAIN_NUMBERS");
            }
        }
        private void ValidateLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                throw new ArgumentNullException("LNAME_EMPTY");
            }
            if (lastName.Any(char.IsDigit))
            {
                throw new ArgumentException("LNAME_CANNOT_CONTAIN_NUMBERS");
            }
        }
        private void ValidateEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException("EMAIL_EMPTY");
            }
            string emailRegex= @"^[\w-\.]+@([\w-]+\.)+[\w]+$";
            var match = Regex.Match(email,emailRegex, RegexOptions.IgnoreCase);
            if (!match.Success) {
                throw new ArgumentException("EMAIL_INVALID");
            }
        }

    }
}

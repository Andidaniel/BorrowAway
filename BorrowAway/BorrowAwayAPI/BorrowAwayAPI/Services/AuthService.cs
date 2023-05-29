using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace BorrowAwayAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly BorrowAwayDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthService(BorrowAwayDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
        }

        public async Task<AppUser> RegisterUser(RegisterUserDTO userToRegister)
        {

            AppUser userToCreate = new AppUser();
            userToRegister.Email = userToRegister.Email.ToLower();
            ValidateUserDTO(userToRegister);
            CreatePasswordHash(userToRegister.Password, out byte[] passwordHash, out byte[] passwordSalt);

            userToCreate.FirstName = userToRegister.FirstName;
            userToCreate.LastName = userToRegister.LastName;
            userToCreate.Email = userToRegister.Email;
            userToCreate.PasswordHash = passwordHash;
            userToCreate.PasswordSalt = passwordSalt;
            userToCreate.Role = "User";

            await _dbContext.Users.AddAsync(userToCreate);
            await _dbContext.SaveChangesAsync();

            return userToCreate;
        }

        public async Task<string> LoginUser(LoginUserDTO userToLogin)
        {
            userToLogin.Email = userToLogin.Email.ToLower();
            AppUser? dbUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.Email.Equals(userToLogin.Email));
            if (dbUser == null)
            {
                throw new Exception("EMAIL_OR_PASSWORD_INVALID");
            }
            if (!VerifyPasswordHash(userToLogin.Password, dbUser.PasswordHash, dbUser.PasswordSalt))
            {
                throw new Exception("EMAIL_OR_PASSWORD_INVALID");
            }
            string token = CreateToken(dbUser);

            return token;
        }

        public async Task<bool> LogoutUser(string rawToken)
        {
            try
            {
                string token = rawToken.Substring(7, rawToken.Length - 7);
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                JwtSecurityToken decodedJWT = handler.ReadJwtToken(token);
                DateTime expirationDate = decodedJWT.ValidTo.ToLocalTime();
                DateTime now = DateTime.Now.ToLocalTime();
                if (expirationDate > now) 
                {
                    TokenBlackList blackListedToken = new TokenBlackList
                    {
                        Token = token,
                        ExpirationDate = expirationDate
                    };
                    _dbContext.InvalidTokens.Add(blackListedToken);
                    return await _dbContext.SaveChangesAsync()>0;
                }
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }

        #region Security

        private string CreateToken(AppUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("name", user.FirstName),
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (HMACSHA512 hmac = new HMACSHA512(passwordSalt))
            {
                byte[] computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (HMACSHA512 hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        

        #endregion

        #region Validations

        private void ValidateUserDTO(RegisterUserDTO userDTO)
        {
            ValidateEmail(userDTO.Email);
            ValidateFirstName(userDTO.FirstName);
            ValidateLastName(userDTO.LastName);
            ValidatePassword(userDTO.Password);
        }

        private void ValidatePassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("PASSWORD_EMPTY");
            }
        }

        private void ValidateFirstName(string firstName)
        {
            if (string.IsNullOrEmpty(firstName))
            {
                throw new ArgumentException("FNAME_EMPTY");
            }
            if (firstName.Any(char.IsDigit))
            {
                throw new ArgumentException("FNAME_CANNOT_CONTAIN_NUMBERS");
            }
        }
        private void ValidateLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                throw new ArgumentException("LNAME_EMPTY");
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
                throw new ArgumentException("EMAIL_EMPTY");
            }
            string emailRegex = @"^[\w-\.]+@([\w-]+\.)+[\w]+$";
            var match = Regex.Match(email, emailRegex, RegexOptions.IgnoreCase);
            if (!match.Success)
            {
                throw new ArgumentException("EMAIL_INVALID");
            }
            if (_dbContext.Users.Any(u => email.ToUpper().Equals(u.Email.ToUpper())))
            {
                throw new ArgumentException("EMAIL_EXISTS");
            }
        }

        #endregion
    }
}

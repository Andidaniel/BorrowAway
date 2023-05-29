using BorrowAwayAPI.Context;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BorrowAwayAPI.Services
{
    public class ValidationService : IValidationService
    {
        private readonly BorrowAwayDbContext _dbContext;
        public ValidationService(BorrowAwayDbContext context)
        {
            _dbContext = context;
        }
        public async Task ValidateRequest(string rawToken)
        {
            string token = rawToken.Substring(7, rawToken.Length - 7);
            DeleteExpiredInvalidTokens();
            if (await _dbContext.InvalidTokens.AnyAsync(it => it.Token.Equals(token)))
            {
                throw new Exception();
            }
        }
        private async void DeleteExpiredInvalidTokens()
        {
            DateTime nowTime = DateTime.Now.ToLocalTime();
            List<TokenBlackList> expiredTokens = _dbContext.InvalidTokens.Where(it => it.ExpirationDate < nowTime).ToList();
            if(expiredTokens.Count > 0)
            {
                foreach(var expiredToken in expiredTokens)
                {
                     _dbContext.InvalidTokens.Remove(expiredToken);
                }
                await _dbContext.SaveChangesAsync();
            }
    
        }
    }
}

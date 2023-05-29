namespace BorrowAwayAPI.Services.Interfaces
{
    public interface IValidationService
    {
        Task ValidateRequest(string rawToken);
    }
}

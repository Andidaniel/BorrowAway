using BorrowAwayAPI.Models;

namespace BorrowAwayAPI.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
    }
}

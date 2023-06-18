using BorrowAwayAPI.Context;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BorrowAwayAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly BorrowAwayDbContext _dbContext;

        public CategoryService(BorrowAwayDbContext dbContext)
        {
            _dbContext = dbContext; 
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}

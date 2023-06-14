using BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BorrowAwayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly IValidationService _validationService;
        private readonly ICategoryService _categoryService;

        public CategoryController(IValidationService validationService, ICategoryService categoryService)
        {
            this._validationService = validationService;
            this._categoryService = categoryService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
            string token = HttpContext.Request.Headers["Authorization"].ToString();
            await _validationService.ValidateRequest(token);

            return Ok(await _categoryService.GetAllCategoriesAsync());
        }
    }
}

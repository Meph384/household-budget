using BudgetAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllCategories()
    {
        return Ok(await _categoryRepository.GetAllCategoriesAsync());
    }

    [HttpGet("Seed")]
    public async Task<bool> SeedCategories()
    {
        await _categoryRepository.SeedCategoriesAsync();
        return true;
    }
}
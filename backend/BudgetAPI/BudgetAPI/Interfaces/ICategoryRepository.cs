using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<int?> GetCategoryIdByTitleAsync(string categoryTitle);
    Task SeedCategoriesAsync();
}

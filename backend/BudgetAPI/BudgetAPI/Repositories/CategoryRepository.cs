using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<int?> GetCategoryIdByTitleAsync(string categoryTitle)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Title == categoryTitle);
        return category?.CategoryId;
    }

    public async Task SeedCategoriesAsync()
    {
        if (!_context.Categories.Any())
        {
            var categories = new List<Category>
            {
                new Category { Title = "Groceries", Icon = "apple", Type = "Expense" },
                new Category { Title = "Rent", Icon = "house", Type = "Expense" },
                new Category { Title = "Salary", Icon = "briefcase", Type = "Income" },
                new Category { Title = "Utilities", Icon = "light_bulb", Type = "Expense" },
                new Category { Title = "Dining Out", Icon = "dining", Type = "Expense" },
                new Category { Title = "Fuel", Icon = "gas_pump", Type = "Expense" },
                new Category { Title = "Gifts", Icon = "gift", Type = "Expense" },
                new Category { Title = "Gym", Icon = "weight_lifter", Type = "Expense" },
                new Category { Title = "Entertainment", Icon = "game_controller", Type = "Expense" },
                new Category { Title = "Savings", Icon = "piggy_bank", Type = "Income" }
            };

            await _context.Categories.AddRangeAsync(categories);
            await _context.SaveChangesAsync();
        }
    }
}

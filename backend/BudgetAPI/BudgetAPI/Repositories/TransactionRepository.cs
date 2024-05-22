using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ICategoryRepository _categoryRepository;
    
    public TransactionRepository(ApplicationDbContext context, ICategoryRepository categoryRepository)
    {
        _context = context;
        _categoryRepository = categoryRepository;
    }

    public async Task<List<Transaction>> GetAllTransactionsAsync()
    {
        return await _context.Transactions
            .Include(t => t.Category)
            .ToListAsync();
    }

    public async Task<Transaction?> GetTransactionByIdAsync(int transactionId)
    {
        return await _context.Transactions
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
    }


    public async Task<Transaction> AddTransactionAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task SeedTransactionsAsync()
    {
        var categories = await _context.Categories.ToListAsync();
        if (!categories.Any())
        {
            await _categoryRepository.SeedCategoriesAsync();
        }
        
        if (!_context.Transactions.Any())
        {
            var transactions = new List<Transaction>
            {
                new Transaction
                {
                    CategoryId = categories[0].CategoryId, Description = "Grocery shopping", Amount = 150.50,
                    Date = DateTime.Now.AddDays(-10)
                },
                new Transaction
                {
                    CategoryId = categories[0].CategoryId, Description = "Weekly groceries", Amount = 80,
                    Date = DateTime.Now.AddDays(-7)
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId, Description = "Monthly rent", Amount = 1200,
                    Date = DateTime.Now.AddDays(-30)
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId, Description = "Rent for April", Amount = 1200,
                    Date = DateTime.Now.AddMonths(-1)
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId, Description = "Salary for March", Amount = 3000,
                    Date = DateTime.Now.AddMonths(-1)
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId, Description = "Salary for April", Amount = 3000,
                    Date = DateTime.Now.AddDays(-30)
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId, Description = "Electricity bill", Amount = 60.75,
                    Date = DateTime.Now.AddDays(-20)
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId, Description = "Water bill", Amount = 40.25,
                    Date = DateTime.Now.AddDays(-18)
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId, Description = "Dinner at restaurant", Amount = 45,
                    Date = DateTime.Now.AddDays(-2)
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId, Description = "Lunch at cafe", Amount = 30,
                    Date = DateTime.Now.AddDays(-3)
                }
            };

            await _context.Transactions.AddRangeAsync(transactions);
            await _context.SaveChangesAsync();
        }
    }
}
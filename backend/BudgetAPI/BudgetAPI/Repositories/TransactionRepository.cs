using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ICurrencyRepository _currencyRepository;

    public TransactionRepository(ApplicationDbContext context, ICategoryRepository categoryRepository, ICurrencyRepository currencyRepository)
    {
        _context = context;
        _categoryRepository = categoryRepository;
        _currencyRepository = currencyRepository;
    }

    public async Task<List<TransactionDto>> GetAllTransactionsAsync(string userId, DateTime? startDate = null, DateTime? endDate = null)
    {
        IQueryable<Transaction> query = _context.Transactions
            .Include(t => t.Category)
            .Include(t => t.Currency)
            .Where(t => t.UserId == Int32.Parse(userId))
            .AsQueryable();

        if (startDate.HasValue)
        {
            query = query.Where(t => t.Date >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            query = query.Where(t => t.Date <= endDate.Value);
        }

        return await query
            .Select(t => new TransactionDto
            {
                TransactionId = t.TransactionId,
                CategoryTitle = t.Category.Title,
                CurrencyCode = t.Currency.Code,
                Description = t.Description,
                Amount = t.Amount,
                Date = t.Date
            }).ToListAsync();
    }

    public async Task<Transaction?> GetTransactionByIdAsync(int transactionId)
    {
        return await _context.Transactions
            .Include(t => t.Category)
            .Include(t => t.Currency)
            .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
    }

    public async Task AddTransactionAsync(Transaction transaction)
    {
        var user = await _context.Users.FindAsync(transaction.UserId);
        if (user != null)
        {
            user.Balance += transaction.Amount;
            _context.Users.Update(user);
        }

        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteTransactionAsync(int transactionId)
    {
        Transaction? transaction = await _context.Transactions.FindAsync(transactionId);
        if (transaction == null)
        {
            return false;
        }

        var user = await _context.Users.FindAsync(transaction.UserId);
        if (user != null)
        {
            user.Balance -= transaction.Amount; // Update balance
            _context.Users.Update(user);
        }

        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task UpdateTransactionAsync(Transaction transaction)
    {
        var existingTransaction = await _context.Transactions.AsNoTracking().FirstOrDefaultAsync(t => t.TransactionId == transaction.TransactionId);
        if (existingTransaction != null)
        {
            var user = await _context.Users.FindAsync(transaction.UserId);
            if (user != null)
            {
                user.Balance -= existingTransaction.Amount; // Revert old amount
                user.Balance += transaction.Amount; // Apply new amount
                _context.Users.Update(user);
            }
        }

        _context.Transactions.Update(transaction);
        await _context.SaveChangesAsync();
    }
    
    public async Task SeedTransactionsAsync()
    {
        List<Category> categories = await _context.Categories.ToListAsync();
        List<Currency> currencies = await _context.Currencies.ToListAsync();

        if (!categories.Any())
        {
            await _categoryRepository.SeedCategoriesAsync();
        }
        
        if (!currencies.Any())
        {
            await _currencyRepository.SeedCurrenciesAsync();
            currencies = await _context.Currencies.ToListAsync();
        }
        
        if (!_context.Transactions.Any())
        {
            List<Transaction> transactions = new List<Transaction>
            {
                new Transaction
                {
                    CategoryId = categories[0].CategoryId,
                    CurrencyId = currencies[0].CurrencyId,
                    Description = "Grocery shopping",
                    Amount = 150.50,
                    Date = DateTime.Now.AddDays(-10),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[0].CategoryId,
                    CurrencyId = currencies[0].CurrencyId,
                    Description = "Weekly groceries",
                    Amount = 80,
                    Date = DateTime.Now.AddDays(-7),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId,
                    CurrencyId = currencies[1].CurrencyId,
                    Description = "Monthly rent",
                    Amount = 1200,
                    Date = DateTime.Now.AddDays(-30),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId,
                    CurrencyId = currencies[1].CurrencyId,
                    Description = "Rent for April",
                    Amount = 1200,
                    Date = DateTime.Now.AddMonths(-1),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId,
                    CurrencyId = currencies[2].CurrencyId,
                    Description = "Salary for March",
                    Amount = 3000,
                    Date = DateTime.Now.AddMonths(-1),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId,
                    CurrencyId = currencies[2].CurrencyId,
                    Description = "Salary for April",
                    Amount = 3000,
                    Date = DateTime.Now.AddDays(-30),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId,
                    CurrencyId = currencies[3].CurrencyId,
                    Description = "Electricity bill",
                    Amount = 60.75,
                    Date = DateTime.Now.AddDays(-20),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId,
                    CurrencyId = currencies[3].CurrencyId,
                    Description = "Water bill",
                    Amount = 40.25,
                    Date = DateTime.Now.AddDays(-18),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId,
                    CurrencyId = currencies[4].CurrencyId,
                    Description = "Dinner at restaurant",
                    Amount = 45,
                    Date = DateTime.Now.AddDays(-2),
                    UserId = 1
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId, 
                    CurrencyId = currencies[4].CurrencyId,
                    Description = "Lunch at cafe",
                    Amount = 30,
                    Date = DateTime.Now.AddDays(-3),
                    UserId = 1
                }
            };

            await _context.Transactions.AddRangeAsync(transactions);
            await _context.SaveChangesAsync();
        }
    }
    
        public async Task<IEnumerable<CategorySpending>> GetSpendingsByCategoryForCurrentYearAsync()
        {
            var currentYear = DateTime.Now.Year;
            return await _context.Transactions
                .Where(t => t.Date.Year == currentYear && t.Category.Type == "Expense")
                .GroupBy(t => t.Category)
                .Select(g => new CategorySpending 
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(t => t.Amount)
                })
                .ToListAsync();
        }


        public async Task<Dictionary<string, Dictionary<string, double>>> GetCategoriesGroupedByMonthAsync()
        {
            var result = await _context.Transactions
                .GroupBy(t => new { t.Category.Type, Month = t.Date.Month, Year = t.Date.Year })
                .Select(g => new 
                {
                    g.Key.Type,
                    g.Key.Month,
                    g.Key.Year,
                    TotalAmount = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return result
                .GroupBy(x => x.Type)
                .ToDictionary(
                    g => g.Key,
                    g => g.GroupBy(x => $"{x.Year}-{x.Month:00}")
                          .ToDictionary(gg => gg.Key, gg => gg.Sum(x => x.TotalAmount))
                );
        }

        public async Task<Dictionary<string, Dictionary<string, double>>> GetCategoriesGroupedByDayForLast14DaysAsync()
        {
            var startDate = DateTime.Now.AddDays(-14);
            var result = await _context.Transactions
                .Where(t => t.Date >= startDate)
                .GroupBy(t => new { t.Category.Type, Date = t.Date.Date })
                .Select(g => new 
                {
                    g.Key.Type,
                    g.Key.Date,
                    TotalAmount = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return result
                .GroupBy(x => x.Type)
                .ToDictionary(
                    g => g.Key,
                    g => g.GroupBy(x => x.Date.ToString("yyyy-MM-dd"))
                          .ToDictionary(gg => gg.Key, gg => gg.Sum(x => x.TotalAmount))
                );
        }

}
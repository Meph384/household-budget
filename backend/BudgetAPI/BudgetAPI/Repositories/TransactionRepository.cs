using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Mvc.Filters;
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

    public async Task<List<TransactionDto>> GetAllTransactionsAsync(DateTime? startDate = null, DateTime? endDate = null)
    {
        IQueryable<Transaction> query = _context.Transactions
            .Include(t => t.Category)
            .Include(t => t.Currency)
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

    public async Task<Transaction> AddTransactionAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    public async Task<bool> DeleteTransactionAsync(int transactionId)
    {
        Transaction? transaction = await _context.Transactions.FindAsync(transactionId);
        if (transaction == null)
        {
            return false;
        }

        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Transaction> UpdateTransactionAsync(Transaction transaction)
    {
        _context.Transactions.Update(transaction);
        await _context.SaveChangesAsync();
        return transaction;
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
                    Date = DateTime.Now.AddDays(-10)
                },
                new Transaction
                {
                    CategoryId = categories[0].CategoryId,
                    CurrencyId = currencies[0].CurrencyId,
                    Description = "Weekly groceries",
                    Amount = 80,
                    Date = DateTime.Now.AddDays(-7)
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId,
                    CurrencyId = currencies[1].CurrencyId,
                    Description = "Monthly rent",
                    Amount = 1200,
                    Date = DateTime.Now.AddDays(-30)
                },
                new Transaction
                {
                    CategoryId = categories[1].CategoryId,
                    CurrencyId = currencies[1].CurrencyId,
                    Description = "Rent for April",
                    Amount = 1200,
                    Date = DateTime.Now.AddMonths(-1)
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId,
                    CurrencyId = currencies[2].CurrencyId,
                    Description = "Salary for March",
                    Amount = 3000,
                    Date = DateTime.Now.AddMonths(-1)
                },
                new Transaction
                {
                    CategoryId = categories[2].CategoryId,
                    CurrencyId = currencies[2].CurrencyId,
                    Description = "Salary for April",
                    Amount = 3000,
                    Date = DateTime.Now.AddDays(-30)
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId,
                    CurrencyId = currencies[3].CurrencyId,
                    Description = "Electricity bill",
                    Amount = 60.75,
                    Date = DateTime.Now.AddDays(-20)
                },
                new Transaction
                {
                    CategoryId = categories[3].CategoryId,
                    CurrencyId = currencies[3].CurrencyId,
                    Description = "Water bill",
                    Amount = 40.25,
                    Date = DateTime.Now.AddDays(-18)
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId,
                    CurrencyId = currencies[4].CurrencyId,
                    Description = "Dinner at restaurant",
                    Amount = 45,
                    Date = DateTime.Now.AddDays(-2)
                },
                new Transaction
                {
                    CategoryId = categories[4].CategoryId, 
                    CurrencyId = currencies[4].CurrencyId,
                    Description = "Lunch at cafe",
                    Amount = 30,
                    Date = DateTime.Now.AddDays(-3)
                }
            };

            await _context.Transactions.AddRangeAsync(transactions);
            await _context.SaveChangesAsync();
        }
    }
}
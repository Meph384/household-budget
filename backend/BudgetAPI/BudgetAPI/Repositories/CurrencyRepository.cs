using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Repositories;

public class CurrencyRepository : ICurrencyRepository
{
    private readonly ApplicationDbContext _context;

    public CurrencyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Currency>> GetCurrencies()
    {
        return await _context.Currencies.ToListAsync();
    }

    public async Task<int?> GetCurrencyIdByCodeAsync(string currencyCode)
    {
        Currency? currency = await _context.Currencies
            .FirstOrDefaultAsync(c => c.Code == currencyCode);
        return currency?.CurrencyId;
    }

    public async Task SeedCurrenciesAsync()
    {
        if (!_context.Currencies.Any())
        {
            Currency[] currencies = new[]
            {
                new Currency { Code = "PLN", Name = "Polish Zloty" },
                new Currency { Code = "USD", Name = "US Dollar" },
                new Currency { Code = "EUR", Name = "Euro" },
                new Currency { Code = "GBP", Name = "British Pound" },
                new Currency { Code = "JPY", Name = "Japanese Yen" },
                new Currency { Code = "AUD", Name = "Australian Dollar" },
                new Currency { Code = "CAD", Name = "Canadian Dollar" },
                new Currency { Code = "CHF", Name = "Swiss Franc" },
                new Currency { Code = "CNY", Name = "Chinese Yuan" },
                new Currency { Code = "SEK", Name = "Swedish Krona" }
            };

            await _context.Currencies.AddRangeAsync(currencies);
            await _context.SaveChangesAsync();
        }
    }
}
using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ICurrencyRepository
{
    Task<IEnumerable<Currency>> GetCurrencies();
    Task<int?> GetCurrencyIdByCodeAsync(string currencyCode);
    Task SeedCurrenciesAsync();
}
using BudgetAPI.DTOs;
using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ITransactionRepository
{
    Task<List<TransactionDto>> GetAllTransactionsAsync(string userId, DateTime? startDate = null, DateTime? endDate = null);
    Task<Transaction?> GetTransactionByIdAsync(int transactionId);
    Task AddTransactionAsync(Transaction transaction);
    Task<bool> DeleteTransactionAsync(int transactionId);
    Task UpdateTransactionAsync(Transaction transaction);
    Task SeedTransactionsAsync();
    Task<IEnumerable<CategorySpending>> GetSpendingsByCategoryForCurrentYearAsync();
    Task<Dictionary<string, Dictionary<string, double>>> GetCategoriesGroupedByMonthAsync();
    Task<Dictionary<string, Dictionary<string, double>>> GetCategoriesGroupedByDayForLast14DaysAsync();
}
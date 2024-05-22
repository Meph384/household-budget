using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ITransactionRepository
{
    Task<List<Transaction>> GetAllTransactionsAsync();
    Task<Transaction?> GetTransactionByIdAsync(int transactionId);
    Task<Transaction> AddTransactionAsync(Transaction transaction);
    Task SeedTransactionsAsync();
}
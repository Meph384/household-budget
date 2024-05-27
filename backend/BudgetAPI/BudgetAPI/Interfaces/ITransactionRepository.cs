using BudgetAPI.DTOs;
using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ITransactionRepository
{
    Task<List<TransactionDto>> GetAllTransactionsAsync(DateTime? startDate = null, DateTime? endDate = null);
    Task<Transaction?> GetTransactionByIdAsync(int transactionId);
    Task<Transaction> AddTransactionAsync(Transaction transaction);
    Task<bool> DeleteTransactionAsync(int transactionId);
    Task<Transaction> UpdateTransactionAsync(Transaction transaction);
    Task SeedTransactionsAsync();
}
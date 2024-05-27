using BudgetAPI.DTOs;
using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface ITransactionRepository
{
    Task<List<TransactionDto>> GetAllTransactionsAsync();
    Task<Transaction?> GetTransactionByIdAsync(int transactionId);
    Task<Transaction> AddTransactionAsync(Transaction transaction);
    Task SeedTransactionsAsync();
}
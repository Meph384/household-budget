using BudgetAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Repositories;

public class FinanceRepository : IFinanceRepository
{
    private readonly BudgetAppContext _dbContext;

    public FinanceRepository(BudgetAppContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<FinancialTransaction>> GetFinanceRecords()
    {
        var result = await _dbContext.FinancialTransactions.Select(x => new FinancialTransaction
        {
            Amount = x.Amount,
            TransactionId = x.TransactionId,
            Budget = x.Budget,
            Category = x.Category,
            Description = x.Description,
            BudgetId = x.BudgetId,
            CategoryId = x.CategoryId,
            CreatedAt = x.CreatedAt,
            UpdatedAt = x.UpdatedAt
        }).ToListAsync();

        return result;
    }

    public async Task<FinancialTransaction> CreateTransaction(FinancialTransaction transaction)
    {
        _dbContext.FinancialTransactions.Add(transaction);
        await _dbContext.SaveChangesAsync();
        return transaction;
    }
    
    public async Task<bool> DeleteTransacrtion(int transactionId)
    {
        await _dbContext.FinancialTransactions.Where(x => x.TransactionId == transactionId).ExecuteDeleteAsync();

        return true;
    }

    public async Task<FinancialTransaction> EditTransaction(FinancialTransaction transaction)
    {
        await _dbContext.FinancialTransactions.Where(x => x.TransactionId == transaction.TransactionId)
            .ExecuteUpdateAsync(x => x.SetProperty(x => x.Amount, transaction.Amount));

        return transaction;
    }
}
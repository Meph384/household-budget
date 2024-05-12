namespace BudgetAPI.Interfaces;

public interface IFinanceRepository
{
    Task<List<FinancialTransaction>> GetFinanceRecords();
    Task<FinancialTransaction> CreateTransaction(FinancialTransaction transaction);
    Task<FinancialTransaction> EditTransaction(FinancialTransaction transaction);
    Task<bool> DeleteTransacrtion(int id);
}
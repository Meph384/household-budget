namespace BudgetAPI.DTOs;

public class UpdateTransactionDto
{
    public int TransactionId { get; set; }
    public string CategoryTitle { get; set; }
    public string Description { get; set; }
    public double Amount { get; set; }
    public DateTime Date { get; set; }
    public string CurrencyCode { get; set; }
}

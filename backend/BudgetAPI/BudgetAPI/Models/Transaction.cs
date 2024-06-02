using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetAPI.Models;

public class Transaction
{
    [Key]
    public int TransactionId { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string Description { get; set; }
    public double Amount { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public int CurrencyId { get; set; }
    public Currency Currency { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}

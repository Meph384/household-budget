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
}